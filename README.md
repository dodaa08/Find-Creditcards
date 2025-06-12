# Cardify – AI-Powered Credit Card Finder

Cardify is a modern, responsive web app built with Next.js and React that helps users discover and compare credit cards using AI. Users can filter cards by bank, type, features, and more, and get personalized recommendations powered by Gemini AI.

---

## 🚀 Features

- **AI-Powered Search:** Ask questions in natural language and get the best-matching credit cards, with support for multiple recommendations.
- **Advanced Filtering:** Sidebar filter for banks, card types, fees, salary, features, and categories.
- **Responsive Design:** Works beautifully on desktop and mobile, with a collapsible sidebar and hamburger menu.
- **Credit Card Comparison:** Select cards and compare them using AI.
- **Light/Dark Mode:** Seamless theme switching.
- **Modern UI:** Built with Tailwind CSS and React Icons.

---

## 📺 Demo

[![Watch the demo](https://shorturl.at/vkJa9)](https://shorturl.at/vkJa9)

---


## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cardify.git
   cd cardify
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` and add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🗂️ Project Structure

- `app/` – Main Next.js app directory
  - `components/Landing/` – UI components for the landing page (Header, HeroSection, SidebarFilter, CreditCardList, etc.)
  - `Data/` – Credit card data
  - `api/gemini/` – API route for AI-powered card recommendations
  - `(pages)/Landing/` – Main landing page logic
- `public/` – Static assets

---

## 🤖 AI Integration

- Uses Google Gemini API for natural language credit card recommendations and comparison.
- Returns multiple cards if the AI finds several matches.

---

## 📦 Built With

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-icons](https://react-icons.github.io/react-icons/)
- [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

*Leave a ⭐ if you like this project!*
