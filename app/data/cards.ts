export interface CardData {
  id: string;
  bank: string;
  name: string;
  number: string;
  expiry: string;
  holder: string;
  color: string; // Tailwind gradient or bg class
  logo?: string; // Optional logo url or type
  visitUrl: string;
}

export const cards: CardData[] = [
  {
    id: '1',
    bank: 'HDFC Bank',
    name: 'HDFC Regalia',
    number: '1234 5678 1992 0226',
    expiry: '03/26',
    holder: 'ANA JIKA',
    color: 'bg-gradient-to-tr from-violet-700 to-purple-400',
    logo: '',
    visitUrl: 'https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-credit-card',
  },
  {
    id: '2',
    bank: 'Axis Bank',
    name: 'Axis Magnus',
    number: '9037 7267 8723 7742',
    expiry: '06/22',
    holder: 'YOUR WALLET',
    color: 'bg-gradient-to-tr from-yellow-400 via-yellow-500 to-orange-400',
    logo: '',
    visitUrl: 'https://www.axisbank.com/retail/cards/credit-card/axis-bank-magnus-credit-card',
  },
  {
    id: '3',
    bank: 'ICICI Bank',
    name: 'ICICI Amazon Pay',
    number: '4321 8765 1234 5678',
    expiry: '12/28',
    holder: 'ICICI USER',
    color: 'bg-gradient-to-tr from-orange-600 to-yellow-400',
    logo: '',
    visitUrl: 'https://www.icicibank.com/Personal-Banking/cards/Consumer-Cards/Credit-Card/amazon-pay-credit-card',
  },
]; 