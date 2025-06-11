export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  type: string;
  annualFee: number;
  joiningFee: number;
  rewardRate: string;
  welcomeBonus: string;
  loungeAccess: boolean;
  fuelSurcharge: boolean;
  minSalary: number;
  benefits: string[];
  categories: string[];
  imageUrl: string;
  color: string;
  rating: number;
  description: string;
  keyHighlights: string[];
  restrictions: string[];
  offerHistory: { date: string; offer: string; type: string }[];
}

export const creditCardsData: CreditCard[] = [
  // ENTRY‑LEVEL 🟢
  {
    id: 'axis-neo',
    name: 'Axis Neo',
    bank: 'Axis Bank',
    type: 'entry-level',
    annualFee: 250,
    joiningFee: 250,
    rewardRate: '1 EDGE point per ₹200',
    welcomeBonus: '₹250 Amazon voucher',
    loungeAccess: false,
    fuelSurcharge: false,
    minSalary: 0,
    benefits: ['₹300 cashback on first utility bill', '10–40% discounts on Zomato, Blinkit, BookMyShow', 'EMI conversion ≥ ₹1,500'],
    categories: ['online shopping', 'bill payments', 'movies & OTT', 'EMI offers', 'cashback'],
    imageUrl: '/api/placeholder/300/190',
    color: '#2563EB',
    rating: 4.0,
    description: 'Low‑fee lifestyle card with utility, dining & entertainment savings.',
    keyHighlights: ['Lifetime free via spends', 'Welcome utility cashback', 'Mid‑week discounts'],
    restrictions: ['No lounge access', 'Modest reward rate'],
    offerHistory: [
      { date: '2025‑06', offer: '₹250 voucher on approval', type: 'welcome' },
      { date: '2025‑05', offer: 'Monthly Zomato/Blinkit discounts', type: 'cashback' }
    ]
  },
  {
    id: 'hdfc-moneyback-plus',
    name: 'HDFC MoneyBack+',
    bank: 'HDFC Bank',
    type: 'entry-level',
    annualFee: 500,
    joiningFee: 500,
    rewardRate: '2× CashPoints per ₹150 (10× on select partners)',
    welcomeBonus: '500 CashPoints',
    loungeAccess: false,
    fuelSurcharge: true,
    minSalary: 240000,
    benefits: ['₹500 gift voucher per ₹50k spend/quarter', '1% fuel surcharge waiver (max ₹250/cycle)', 'Smart EMI option'],
    categories: ['cashback', 'online shopping', 'grocery', 'EMI offers'],
    imageUrl: '/api/placeholder/300/190',
    color: '#1E3A8A',
    rating: 4.1,
    description: 'Everyday cashback and partner bonuses on a low‑fee card.',
    keyHighlights: ['High multipliers on e‑commerce', 'Fee waiver on ₹50k spend', 'Quarterly vouchers'],
    restrictions: ['Fuel waiver cap', 'Reward caps monthly'],
    offerHistory: [
      { date: '2025‑03', offer: '500 CashPoints on join', type: 'welcome' },
      { date: '2024‑12', offer: '₹500 voucher per quarter', type: 'cashback' }
    ]
  },
  {
    id: 'sbi-cashback',
    name: 'SBI Cashback Card',
    bank: 'State Bank of India',
    type: 'entry-level',
    annualFee: 999,
    joiningFee: 999,
    rewardRate: '5% online, 1% offline',
    welcomeBonus: '',
    loungeAccess: false,
    fuelSurcharge: true,
    minSalary: 0,
    benefits: ['5% cashback online (₹5k/mo cap)', '1% offline cashback', '1% fuel surcharge waiver'],
    categories: ['cashback', 'online shopping', 'bill payments', 'fuel'],
    imageUrl: '/api/placeholder/300/190',
    color: '#00338D',
    rating: 4.1,
    description: 'Simple cashback card with strong online rewards.',
    keyHighlights: ['High online cashback', 'Fee waiver on ₹2L spend', 'Fuel waiver'],
    restrictions: ['₹5k/mo cap', 'No lounge access'],
    offerHistory: [
      { date: '2025‑01', offer: 'Fee waiver on ₹2L spend', type: 'waiver' },
      { date: '2024‑12', offer: '5% flat online cashback', type: 'cashback' }
    ]
  },

  // MID‑TIER / PREMIUM
  {
    id: 'axis-ace',
    name: 'Axis ACE',
    bank: 'Axis Bank',
    type: 'mid-tier',
    annualFee: 499,
    joiningFee: 499,
    rewardRate: '5% bills/Recharges via GPay, 4% food/ride, 1.5% others',
    welcomeBonus: '5,000 EDGE points',
    loungeAccess: true,
    fuelSurcharge: true,
    minSalary: 0,
    benefits: ['4 domestic lounge visits/year (₹50k spend)', '1% fuel surcharge waiver', 'Up to 15% dining discounts', 'EMI on ≥₹2,500 spends'],
    categories: ['cashback', 'bill payments', 'dining', 'fuel', 'EMI offers'],
    imageUrl: '/api/placeholder/300/190',
    color: '#F97316',
    rating: 4.2,
    description: 'Low‑fee cashback card with utility, food, fuel perks & lounge access.',
    keyHighlights: ['High cashback on everyday spends', 'Lounge visits', 'Fee-waiver via spends'],
    restrictions: ['Cashback capped at ₹500/mo', 'Fee waived on ₹2L annual spend'],
    offerHistory: [
      { date: '2025‑01', offer: '5,000 EDGE pts on ₹1k spend', type: 'welcome' },
      { date: '2024‑09', offer: '15% dining discounts', type: 'cashback' }
    ]
  },
  {
    id: 'citi-cashback',
    name: 'Citi Cashback',
    bank: 'Citi Bank',
    type: 'mid-tier',
    annualFee: 500,
    joiningFee: 500,
    rewardRate: '5% on bills, movies; 0.5% others',
    welcomeBonus: '',
    loungeAccess: false,
    fuelSurcharge: true,
    minSalary: 0,
    benefits: ['5% cashback on telephone, utility, movie tickets', '0.5% on other spends'],
    categories: ['cashback', 'bill payments', 'movies & OTT'],
    imageUrl: '/api/placeholder/300/190',
    color: '#289CD1',
    rating: 4.0,
    description: 'Straight cashback on billing & entertainment spends.',
    keyHighlights: ['5% on key categories', 'Instant cashback'],
    restrictions: ['No lounge', 'Low rate on general spends'],
    offerHistory: [
      { date: '2024‑12', offer: '₹3300 cashback 1st year', type: 'welcome' }
    ]
  },
  {
    id: 'standard-chartered-super-value',
    name: 'SC Super Value Titanium',
    bank: 'Standard Chartered',
    type: 'mid-tier',
    annualFee: 750,
    joiningFee: 750,
    rewardRate: '5% on fuel/bills (₹100/mo cap each), 1 RP per ₹150 others',
    welcomeBonus: '',
    loungeAccess: false,
    fuelSurcharge: true,
    minSalary: 0,
    benefits: ['5% cashback on fuel, phone & utility bills', 'Balance transfer at 0.99% for 6 months'],
    categories: ['cashback', 'fuel', 'bill payments'],
    imageUrl: '/api/placeholder/300/190',
    color: '#00578C',
    rating: 4.1,
    description: 'Strong bill and utility cashback card with balance transfer benefits.',
    keyHighlights: ['5% on utilities & fuel', 'BT at 0.99%'],
    restrictions: ['Cashback capped monthly'],
    offerHistory: [
      { date: '2025‑02', offer: 'BT @0.99% for 6 months', type: 'cashback' }
    ]
  },
  {
    id: 'sbi-prime',
    name: 'SBI Prime',
    bank: 'State Bank of India',
    type: 'premium',
    annualFee: 2999,
    joiningFee: 2999,
    rewardRate: '2 reward pts per ₹100 (20× on birthday)',
    welcomeBonus: 'Welcome gift worth ₹3,000',
    loungeAccess: true,
    fuelSurcharge: true,
    minSalary: 0,
    benefits: ['Airport lounge access', 'Milestone benefits via spends', 'Birthday reward acceleration', 'Flexipay EMI conversion'],
    categories: ['travel', 'lifestyle', 'dining', 'EMI offers'],
    imageUrl: '/api/placeholder/300/190',
    color: '#0066A1',
    rating: 4.2,
    description: 'Premium SBI card with travel, lifestyle & spend accelerator benefits.',
    keyHighlights: ['Complimentary lounges', 'Milestone-based rewards', 'Birthday multipliers'],
    restrictions: ['Fee waived on ₹3L spend'],
    offerHistory: [
      { date: '2025‑07', offer: '₹3k welcome gift', type: 'welcome' },
      { date: '2025‑01', offer: 'Fee waiver on ₹3L annual spend', type: 'waiver' }
    ]
  },
  {
    id: 'icici-coral',
    name: 'ICICI Coral',
    bank: 'ICICI Bank',
    type: 'mid-tier',
    annualFee: 500,
    joiningFee: 500,
    rewardRate: '2 RP per ₹100; 1 RP on utilities',
    welcomeBonus: '',
    loungeAccess: true,
    fuelSurcharge: true,
    minSalary: 500000,
    benefits: ['Quarterly movie and dining offers', '1 airport + 1 railway lounge per quarter', 'Fuel surcharge waiver'],
    categories: ['entertainment', 'dining', 'lifestyle', 'movies & OTT'],
    imageUrl: '/api/placeholder/300/190',
    color: '#D32F2F',
    rating: 4.0,
    description: 'Well-rounded mid-tier card with lounge access and lifestyle benefits.',
    keyHighlights: ['Lounge access', 'Movie discounts', 'Milestone bonuses'],
    restrictions: ['Fee reversal on ₹1.5L annual spend'],
    offerHistory: [
      { date: '2024‑12', offer: 'Movie discounts', type: 'cashback' }
    ]
  },
  {
    id: 'hdfc-regalia',
    name: 'HDFC Regalia',
    bank: 'HDFC Bank',
    type: 'premium',
    annualFee: 2500,
    joiningFee: 2500,
    rewardRate: '4 RP per ₹150',
    welcomeBonus: '10,000 RP',
    loungeAccess: true,
    fuelSurcharge: true,
    minSalary: 300000,
    benefits: ['Airport lounge access', '1% fuel waiver', 'Travel insurance', 'Golf privileges'],
    categories: ['travel', 'dining', 'shopping', 'fuel', 'forex benefits'],
    imageUrl: '/api/placeholder/300/190',
    color: '#1E40AF',
    rating: 4.3,
    description: 'Premium lifestyle card with strong travel and forex benefits.',
    keyHighlights: ['High rewards', 'Comprehensive insurance', 'Lounge access'],
    restrictions: ['Fee waiver on ₹3L spend'],
    offerHistory: [
      { date: '2024‑12', offer: 'First year fee waiver', type: 'waiver' },
      { date: '2024‑11', offer: '15k RP on ₹1L spend', type: 'welcome' }
    ]
  },
  {
    id: 'kotak-white-reserve',
    name: 'Kotak White Reserve',
    bank: 'Kotak Mahindra Bank',
    type: 'premium',
    annualFee: 10000,
    joiningFee: 10000,
    rewardRate: '10 RP per ₹100',
    welcomeBonus: '50,000 RP',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 1000000,
    benefits: ['Unlimited domestic lounges', '6 intl lounge visits', 'Movie ticket offers', 'Golf privileges'],
    categories: ['travel', 'entertainment', 'dining', 'lifestyle'],
    imageUrl: '/api/placeholder/300/190',
    color: '#0891B2',
    rating: 4.4,
    description: 'Premium lifestyle card with rich entertainment and travel privileges.',
    keyHighlights: ['High reward rate', 'Unlimited lounges', 'Entertainment perks'],
    restrictions: ['Fee waiver on ₹5L spend'],
    offerHistory: [
      { date: '2024‑12', offer: 'Fee waiver on ₹5L spend', type: 'waiver' },
      { date: '2024‑11', offer: '60k RP on joining', type: 'welcome' }
    ]
  },

  // SUPER‑PREMIUM 🔴
  {
    id: 'hdfc-diners-black-metal',
    name: 'HDFC Diners Club Black Metal',
    bank: 'HDFC Bank',
    type: 'super-premium',
    annualFee: 11800,
    joiningFee: 11800,
    rewardRate: '5 RP per ₹150; 2× dining weekends',
    welcomeBonus: 'Milestone memberships (Club Marriott, Prime, Swiggy)',
    loungeAccess: true,
    fuelSurcharge: true,
    minSalary: 2100000,
    benefits: ['Unlimited domestic/international lounges', '6 golf rounds/qtr', 'SmartBuy accelerated rewards', '2× weekend dining'],
    categories: ['travel', 'dining', 'lifestyle', 'forex benefits'],
    imageUrl: '/api/placeholder/300/190',
    color: '#111827',
    rating: 4.7,
    description: 'Elite metal card with worldwide lounges, golf & premium memberships.',
    keyHighlights: ['Unlimited lounges', 'High SmartBuy rewards', 'Golf privileges'],
    restrictions: ['High fee', '₹8L annual spend for waiver'],
    offerHistory: [
      { date: '2025‑04', offer: 'Membership bundle on ₹1.5L', type: 'welcome' },
      { date: '2024‑07', offer: '2× RP on weekend dining', type: 'cashback' }
    ]
  },
  {
    id: 'amex-platinum-travel',
    name: 'American Express Platinum Travel',
    bank: 'American Express',
    type: 'super-premium',
    annualFee: 60000,
    joiningFee: 60000,
    rewardRate: '5 MR points per ₹100',
    welcomeBonus: '80,000 MR points',
    loungeAccess: true,
    fuelSurcharge: false,
    minSalary: 2500000,
    benefits: ['Unlimited worldwide lounges', 'Centurion access', 'Fine Hotels & Resorts', 'Priority Pass Black', 'Travel insurance'],
    categories: ['luxury travel', 'dining', 'hotels', 'international', 'forex benefits'],
    imageUrl: '/api/placeholder/300/190',
    color: '#6366F1',
    rating: 4.8,
    description: 'Ultra‑luxury card with unmatched global travel privileges.',
    keyHighlights: ['Unlimited lounges', 'Hotel & resort perks', 'Top-tier concierge'],
    restrictions: ['High fee', 'Limited merchant acceptance'],
    offerHistory: [
      { date: '2024‑12', offer: '100k MR points on ₹4L spend', type: 'welcome' },
      { date: '2024‑11', offer: 'Taj membership voucher', type: 'welcome' }
    ]
  }
];

