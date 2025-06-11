import { NextRequest, NextResponse } from "next/server";
import { creditCardsData } from "@/app/Data/data";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function POST(req: NextRequest) {
  const { cardIds } = await req.json();
  const cards = creditCardsData.filter(card => cardIds.includes(card.id));
  if (cards.length < 2) {
    return NextResponse.json({ result: "Please select at least two cards for comparison." }, { status: 400 });
  }

  const prompt = `You are a credit card expert. Compare the following cards and give your opinion on which is best for different user types. Be concise, highlight pros/cons, and suggest who should pick which card.\n\nCARDS:\n${JSON.stringify(cards, null, 2)}`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No comparison generated.";

  return NextResponse.json({ result });
} 