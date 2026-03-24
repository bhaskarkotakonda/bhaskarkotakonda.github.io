import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../os/lib/supabase';
import { GeminiService } from '../../os/lib/ai';
// @ts-ignore - Bypass NPM defective type:module by explicitly targeting the ESM distribution
import { YoutubeTranscript } from 'youtube-transcript/dist/youtube-transcript.esm.js';

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;

  // Validate trigger secret OR valid user session
  const cronSecret = import.meta.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  
  const session = locals.auth();
  const isAuthorizedUser = session?.userId && session.userId === import.meta.env.PERSONAL_OS_ALLOWED_USER_IDS;

  if (!isAuthorizedUser) {
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized Operational Request', { status: 401 });
    }
  }

  const supabase = getSupabaseAdmin();
  
  // 1. Fetch pending rows (Limit to exactly 5 per batch to avoid Vercel Serverless Function timeout limits)
  const { data: pendingRows, error: fetchError } = await supabase
    .from('Raw_Inbox')
    .select('*')
    .eq('processing_status', 'pending')
    .limit(5);

  if (fetchError || !pendingRows || pendingRows.length === 0) {
    return new Response(JSON.stringify({ message: 'No pending items' }), { status: 200 });
  }

  // 2. Fetch Dynamic User Priorities
  const { data: prefs } = await supabase
    .from('User_Preferences')
    .select('importance_criteria')
    .limit(1)
    .single();

  const userPrefs = prefs?.importance_criteria || { priority: "everything" };
  const aiService = new GeminiService(import.meta.env.GEMINI_API_KEY || "");

  const results = [];

  // 3. Sub-Process each row with atomic state checks
  for (const row of pendingRows) {
    try {
      // Optimistic lock check (Mark as processing)
      const { error: lockErr } = await supabase
        .from('Raw_Inbox')
        .update({ processing_status: 'processing' })
        .eq('id', row.id)
        .eq('processing_status', 'pending'); // Ensure we are the only worker parsing this
      
      if (lockErr) continue; // Someone else nabbed it

      // Content strategy
      let payloadContext = row.content_text || '';
      
      // If there is a URL, we MUST scrape the raw HTML text and feed it to the AI, 
      // otherwise, Gemini hallucinates because API models natively lack browser engines.
      if (row.canonical_url) {
        try {
           const isYouTube = row.canonical_url.includes('youtube.com') || row.canonical_url.includes('youtu.be');
           
           if (isYouTube) {
              try {
                 const transcriptList = await YoutubeTranscript.fetchTranscript(row.canonical_url);
                 const scriptText = transcriptList.map((t: any) => t.text).join(' ');
                 payloadContext += `\n\n--- YOUTUBE VIDEO TRANSCRIPT ---\n${scriptText.substring(0, 50000)}`;
              } catch (ytErr) {
                 console.warn(`YouTube Transcript API blocked or unavailable for ${row.canonical_url}. Relying on raw fallback URL.`);
                 payloadContext += `\n\n--- YOUTUBE FALLBACK URL ---\n${row.canonical_url}`;
              }
           } else {
             // Standard web scrape fallback
             const scrapeRes = await fetch(row.canonical_url, { 
               // Spoof user agent to bypass basic anti-bot blockers
               headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
             });
             if (scrapeRes.ok) {
               const rawHtml = await scrapeRes.text();
               // Naked HTML stripper: remove scripts/styles, then remove tags
               const strippedText = rawHtml
                  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
                  .replace(/<[^>]+>/g, " ") // replace standard HTML tags with spaces
                  .replace(/\s+/g, " ")     // collapse whitespace
                  .substring(0, 50000);     // Truncate to safe token limit text
                  
               payloadContext += `\n\n--- EXTRACTED WEBSITE DATA ---\n${strippedText}`;
             }
           }
        } catch (e) {
           console.warn(`Scraping failed for ${row.canonical_url}`, e);
        }
      }
      
      if (!payloadContext.trim()) {
        payloadContext = JSON.stringify(row.raw_payload);
      }
      // Call AI Engine
      const insights = await aiService.generateInsights(payloadContext, userPrefs);

      // Insert into Processed_Nodes
      const { error: insertError } = await supabase.from('Processed_Nodes').insert({
        raw_inbox_id: row.id,
        title: insights.title,
        summary: insights.summary,
        tags: insights.tags,
        importance_score: insights.importance_score,
        actionable_takeaways: insights.actionable_takeaways,
        study_guide_markdown: insights.study_guide_markdown,
        model_name: insights.model_name,
        prompt_version: insights.prompt_version,
        source_url: row.source,
        canonical_url: row.canonical_url
      });

      if (insertError) throw new Error(insertError.message);

      // Mark as finalized/processed
      await supabase.from('Raw_Inbox').update({ 
        processing_status: 'processed', 
        processed_at: new Date().toISOString() 
      }).eq('id', row.id);

      results.push({ id: row.id, status: 'success' });
      
    } catch (err: any) {
      console.error(`Error processing row ${row.id}:`, err);
      // Mark as failed and increment retry_count to safely fail over
      await supabase.from('Raw_Inbox').update({ 
        processing_status: 'failed',
        last_error: err.message || String(err),
        retry_count: (row.retry_count || 0) + 1
      }).eq('id', row.id);
      
      results.push({ id: row.id, status: 'failed', error: err.message });
    }
  }

  return new Response(JSON.stringify({ processed: results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
