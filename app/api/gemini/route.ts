import { NextRequest, NextResponse } from "next/server";
import { creditCardsData } from "@/app/Data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const prompt = `
You are a credit card AI agent.
Based on the following available card details, answer the user's query appropriately.

CARD DETAILS:
${JSON.stringify(creditCardsData, null, 2)}

QUERY:
${query}

Respond with the best matching card's name (exact), or if no match, reply with a helpful message.
  `;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Try to extract a card name from the response
  const found = creditCardsData.find(card =>
    text.toLowerCase().includes(card.name.toLowerCase())
  );

  return NextResponse.json({
    cardName: found ? found.name : null,
    message: found ? `Best match: ${found.name}` : text || "No suitable card found."
  });
} 