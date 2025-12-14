import { GoogleGenAI } from "@google/genai";
import { CoinSide } from "../types";

// NOTE: process.env is removed to prevent "process is not defined" crashes in browser/Vercel deployments
// Since AI features are disabled in the UI, we don't need the key active here.
const apiKey = ''; // process.env.API_KEY; 
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getCoinInterpretation = async (
  side: CoinSide,
  question: string
): Promise<string> => {
  if (!ai) {
    return "The stars are silent (API Key missing).";
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      The user just flipped a coin.
      Result: ${side}
      User's Question/Dilemma: "${question}"

      Act as a mystical, slightly witty, and modern fortune teller.
      Interpret this coin flip result specifically for their question.
      Keep it short (max 2 sentences). Be decisive but fun.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The cosmos is clouded right now. Try again later.";
  }
};