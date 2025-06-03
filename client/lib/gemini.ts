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
    const prompt = `You are a helpful coding assistant. The user is working on the following problem:

Title: ${problemContext.title}
Description: ${problemContext.description}

Examples:
${problemContext.examples.map(ex => `Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

Constraints:
${problemContext.constraints.join('\n')}

The user has written this code in ${language}:
\`\`\`${language}
${currentCode}
\`\`\`

Please provide a helpful hint that will guide them in the right direction without giving away the solution. Focus on:
1. Identifying any potential issues in their current approach
2. Suggesting a specific concept or technique they might want to consider
3. Pointing them towards a more efficient solution if their current approach is suboptimal

Keep your response concise and focused on one key insight.`;

    // Generate content using the new API
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text || "Sorry, I couldn't generate a hint at this time.";
  } catch (error) {
    return "Sorry, I encountered an error while generating a hint. Please try again.";
  }
} 