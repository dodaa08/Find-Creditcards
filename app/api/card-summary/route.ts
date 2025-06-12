import { NextRequest, NextResponse } from "next/server";
import { creditCardsData } from "@/app/Data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  const { cardId } = await req.json();
  const card = creditCardsData.find(c => c.id === cardId);
  if (!card) {
    return NextResponse.json({ summary: "Card not found." }, { status: 404 });
  }

  const prompt = `Summarize this credit card in 4-6 short, clear bullet points or as a markdown table. Focus on the most important features, who it's best for, and any key caveats. Do NOT write a paragraph.\n\nCARD DATA:\n${JSON.stringify(card, null, 2)}`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

  return NextResponse.json({ summary });
} 