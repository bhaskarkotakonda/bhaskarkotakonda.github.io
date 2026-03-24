import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ProcessedAIResult {
  title: string;
  summary: string;
  tags: string[];
  importance_score: number;
  actionable_takeaways: string[];
  study_guide_markdown?: string;
  model_name: string;
  prompt_version: string;
}

export interface AIService {
  generateInsights(
    content: string, 
    userPreferences: any
  ): Promise<ProcessedAIResult>;
}

export class GeminiService implements AIService {
  private ai: GoogleGenerativeAI;
  private readonly MODEL_NAME = "gemini-2.5-flash"; // Update to latest 2026 topology
  private readonly PROMPT_VERSION = "v1.0.0";

  constructor(apiKey: string) {
    this.ai = new GoogleGenerativeAI(apiKey);
  }

  async generateInsights(content: string, userPreferences: any): Promise<ProcessedAIResult> {
    const model = this.ai.getGenerativeModel({ model: this.MODEL_NAME });

    // Truncate logic for safety (approx 100k characters to stay within safety limits quickly)
    const safeContent = content.substring(0, 100000); 

    const prompt = `
      You are an expert system processing an inbox item.
      User Preferences / Priorities (Used to judge the 'importance_score'): ${JSON.stringify(userPreferences)}
      
      Content:
      ${safeContent}

      Extract the following information and output strictly as a JSON object, with no markdown code blocks wrapping the json:
      {
        "title": "A concise title",
        "summary": "A 2-3 sentence TL;DR",
        "tags": ["tag1", "tag2"],
        "importance_score": <1-10 integer based on User Preferences fit>,
        "actionable_takeaways": ["point 1", "point 2"],
        "study_guide_markdown": "If importance_score is 8 or higher, provide a deep-dive markdown formatted study guide utilizing mental models and key structural concepts extracted from the piece. Otherwise, return null."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON safely considering Gemini might wrap in ```json ... ```
    const cleanedJsonString = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      const parsed = JSON.parse(cleanedJsonString);
      return {
        ...parsed,
        title: parsed.title || "Untitled",
        summary: parsed.summary || "No summary provided.",
        tags: parsed.tags || [],
        importance_score: parsed.importance_score || 5, // Default mid-weight
        actionable_takeaways: parsed.actionable_takeaways || [],
        study_guide_markdown: parsed.study_guide_markdown,
        model_name: this.MODEL_NAME,
        prompt_version: this.PROMPT_VERSION
      };
    } catch (e) {
      console.error("AI Response:", responseText);
      throw new Error("Failed to parse JSON strictly from AI model.");
    }
  }
}
