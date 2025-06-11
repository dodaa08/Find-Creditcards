"use client";
import React from "react";
import { CreditCard } from "../../Data/data";
import CreditCardCard from "./CreditCard";

interface CreditCardListProps {
  cards: CreditCard[];
}

export default function CreditCardList({ cards }: CreditCardListProps) {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
      {cards.map(card => (
        <CreditCardCard card={card} key={card.id} />
      ))}
    </div>
  );
} 