import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const genAI = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || "" });

export interface ProblemContext {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
}

export async function getHint(
  problemContext: ProblemContext,
  currentCode: string,
  language: string
): Promise<string> {
  try {
    const response = await fetch('/api/hint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        problemContext,
        currentCode,
        language,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ details: 'Unknown error' }));
      throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hint;
  } catch (error: any) {
    console.error("Error getting hint:", error);
    return `Sorry, I encountered an error while generating a hint: ${error.message}. Please try again.`;
  }
} 