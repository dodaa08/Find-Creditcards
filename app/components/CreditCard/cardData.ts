export type CardTag = 'travel' | 'dining' | 'shopping' | 'online shopping' | 'bill payments' | 'everyday spend';

export interface CreditCardData {
  id: string;
  bank: string;
  name: string;
  rating: number;
  fee: string;
  type: string;
  description: string;
  features: string[];
  tags: CardTag[];
  bonus: string;
  color: string;
  borderColor?: string;
}

export const cardData: CreditCardData[] = [
  {
    id: 'regalia',
    bank: 'HDFC Bank',
    name: 'HDFC Regalia',
    rating: 4.3,
    fee: '₹2,500',
    type: 'Premium',
    description: 'A premium lifestyle credit card with excellent travel benefits and rewards.',
    features: [
      '4 reward points per ₹150',
      'Airport Lounge Access',
      'Min Salary: ₹3,00,000',
    ],
    tags: ['travel', 'dining', 'shopping'],
    bonus: '10,000 reward points',
    color: 'bg-indigo-700',
  },
  {
    id: 'magnus',
    bank: 'Axis Bank',
    name: 'Axis Magnus',
    rating: 4.6,
    fee: '₹12,500',
    type: 'Super-Premium',
    description: 'Ultra-premium credit card with exceptional travel benefits and highest rewards.',
    features: [
      '12 EDGE points per ₹200',
      'Airport Lounge Access',
      'Min Salary: ₹15,00,000',
    ],
    tags: ['travel', 'dining', 'shopping'],
    bonus: '25,000 EDGE points',
    color: 'bg-gradient-to-r from-fuchsia-700 to-pink-600',
    borderColor: 'border-yellow-300',
  },
  {
    id: 'amazon',
    bank: 'ICICI Bank',
    name: 'ICICI Amazon Pay',
    rating: 4.2,
    fee: 'FREE',
    type: 'Entry-Level',
    description: 'Perfect entry-level card for Amazon shopping with excellent cashback rates.',
    features: [
      '5% cashback on Amazon',
      'Min Salary: ₹2,00,000',
    ],
    tags: ['online shopping', 'bill payments', 'everyday spend'],
    bonus: '₹2000 Amazon voucher',
    color: 'bg-orange-600',
  },
]; 