import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../../os/lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  // 1. Validate the Webhook Secret (Telegram Custom Header)
  const webhookSecret = import.meta.env.TELEGRAM_WEBHOOK_SECRET;
  const token = request.headers.get('x-telegram-bot-api-secret-token');

  if (webhookSecret && token !== webhookSecret) {
    return new Response('Unauthorized Access', { status: 401 });
  }

  try {
    const payload = await request.json();
    const message = payload.message || payload.edited_message;

    // Acknowledge Telegram heartbeat/empty payloads gracefully
    if (!message) {
      return new Response('No message payload', { status: 200 });
    }

    const chatId = message.chat?.id?.toString();
    const messageId = message.message_id?.toString();
    const allowedChatId = import.meta.env.TELEGRAM_ALLOWED_CHAT_ID;

    // 2. Validate Sender (Is this MY bot?)
    if (allowedChatId && chatId !== allowedChatId) {
      console.warn(`Unauthorized Telegram access from Chat ID: ${chatId}`);
      return new Response('Unknown Chat', { status: 403 });
    }

    // 3. Extract Message Content
    const textContent: string = message.text || message.caption || '';
    const voiceNote = message.voice; 
    let urls = textContent.match(/(https?:\/\/[^\s]+)/g) || [];

    // Base Database Record Data
    const baseRecord = {
      source: 'telegram',
      source_chat_id: chatId,
      raw_payload: message,
      processing_status: 'pending',
    };

    const supabase = getSupabaseAdmin();
    const recordsToInsert = [];

    // 4. Split Multi-URL Messages into isolated rows OR handle audio/plain text
    if (urls.length > 0) {
      urls.forEach((url, i) => {
        recordsToInsert.push({
          ...baseRecord,
          source_message_id: `${messageId}-${i}`, // Prevent duplicate ID clash if multiple URLs are in 1 text
          content_text: textContent,
          canonical_url: url,
          detected_urls: [url],
          content_type: 'link'
        });
      });
    } else if (voiceNote) {
      recordsToInsert.push({
        ...baseRecord,
        source_message_id: messageId,
        content_text: textContent,
        telegram_file_id: voiceNote.file_id,
        media_mime_type: voiceNote.mime_type,
        content_type: 'audio'
      });
    } else {
      recordsToInsert.push({
        ...baseRecord,
        source_message_id: messageId,
        content_text: textContent,
        content_type: 'text'
      });
    }

    // 5. Insert to DB (Idempotent operations)
    let insertCount = 0;
    for (const record of recordsToInsert) {
      const { error } = await supabase.from('Raw_Inbox').insert(record);
      // Supabase returns 409 (Conflict) error if duplicate source_message_id exists. 
      // We ignore the duplicate constraint error gracefully for idempotency.
      if (!error || error.code === '23505') { 
        if (!error) insertCount++;
      } else {
        console.error('Failed to insert telegram record:', error);
      }
    }

    // 6. Synchronous Feedback to the User
    // Tell Telegram bot to reply to the user using the Telegram Bot API
    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    if (botToken && insertCount > 0) {
      const replyText = recordsToInsert.length > 1 
        ? `✅ Saved ${recordsToInsert.length} links to the Inbox! Processing soon...`
        : `✅ Saved to Inbox! Processing soon...`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          reply_to_message_id: messageId,
          text: replyText,
        })
      });
    }

    return new Response('OK', { status: 200 });

  } catch (err) {
    console.error('Telegram Webhook Error:', err);
    // Always return 200 to Telegram so it stops retrying fatally, 
    // unless you distinctively want Telegram exponential backoff
    return new Response('Internal Server Error', { status: 200 });
  }
};
