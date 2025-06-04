import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Add debugging to check API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenAI({ apiKey: apiKey || "" });

export async function POST(request: Request) {
  try {
    const { problemContext, currentCode, language } = await request.json();

    const prompt = `You are a helpful coding assistant. The user is working on the following problem:

Title: ${problemContext.title}
Description: ${problemContext.description}

Examples:
${problemContext.examples.map((ex: any) => `Input: ${ex.input}\nOutput: ${ex.output}${ex.explanation ? `\nExplanation: ${ex.explanation}` : ''}`).join('\n\n')}

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

    // Add debugging for the API call
    console.log("Making Gemini API call with model: gemini-2.0-flash");
    
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return NextResponse.json({ hint: response.text || "Sorry, I couldn't generate a hint at this time." });
  } catch (error: any) {
    console.error("Error generating hint:", error);
    // Add more detailed error information
    return NextResponse.json(
      { 
        error: "Failed to generate hint", 
        details: error.message,
        status: error.status || 500,
        apiKeyPresent: !!process.env.GEMINI_API_KEY
      },
      { status: 500 }
    );
  }
} 