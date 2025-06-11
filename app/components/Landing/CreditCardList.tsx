"use client";
import React from "react";
import { creditCardsData, CreditCard } from "../../Data/data";
import CreditCardCard from "./CreditCard";

function getUniqueCategoryCards(cards: CreditCard[], count: number) {
  const seen = new Set<string>();
  const result: CreditCard[] = [];
  for (const card of cards) {
    const cat = card.type;
    if (!seen.has(cat)) {
      seen.add(cat);
      result.push(card);
    }
    if (result.length === count) break;
  }
  // If not enough unique, fill with more cards
  if (result.length < count) {
    for (const card of cards) {
      if (!result.includes(card)) result.push(card);
      if (result.length === count) break;
    }
  }
  return result;
}

export default function CreditCardList() {
  const cardsToShow = getUniqueCategoryCards(creditCardsData, 6);
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
      {cardsToShow.map(card => (
        <CreditCardCard card={card} key={card.id} />
      ))}
    </div>
  );
} 