# 🛒 E-commerce Product Recommender (Next.js + Supabase + Gemini AI)

An AI-powered **E-commerce Product Recommender System** that merges **modern full-stack development** with **LLM-driven personalization** to create a next-gen shopping experience.  

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | [Next.js 14 (App Router)](https://nextjs.org/docs/app), [Tailwind CSS](https://tailwindcss.com/) |
| **Backend / Database** | [Supabase](https://supabase.com/) (PostgreSQL + Realtime + Auth) |
| **AI Layer** | [Google Gemini AI](https://ai.google.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📖 Overview

This project demonstrates how to integrate **AI-based recommendation logic** into a **Next.js e-commerce platform**.  
Users receive **personalized product suggestions** powered by **Gemini AI**, based on stored product data and simulated user interactions in Supabase.

---

## ✨ Key Features

- ✅ **Browse products** stored in Supabase (`products` table)  
- ✅ **AI-powered recommendations** via Gemini API (`/api/recommend`)  
- ✅ **Session tracking** using cookies (`session_id`)  
- ✅ **Event logging** (`view`, `click`, `add_to_cart`, `purchase`)  
- ✅ **Responsive design** built with Tailwind CSS  
- ✅ **Deployed seamlessly on Vercel**  
- ✅ **CSV import support** for product data  

---

## 🧠 Objective

**Combine recommendation logic with LLM-powered explanations for users.**

### 🔹 Input
- Product catalog (`.csv`)
- User interaction events (views, clicks, purchases)

### 🔹 Output
- AI-generated recommendations (`product_id`, `title`, `reason`)
- Natural-language explanation of *“Why this product?”*

### 🔹 Example Prompt (for Gemini)
> “Explain why product X is recommended to this user based on their browsing and purchase behavior.”

---

## 🧩 Scope of Work

| Component | Description |
|------------|-------------|
| **Backend API** | Handles requests to `/api/recommend`, communicates with Supabase, and fetches personalized results. |
| **Database** | Stores product catalog and user behavior logs. |
| **LLM Integration** | Generates textual explanations for recommended products. |
| **Frontend Dashboard** | Displays recommended items with reasoning, category filters, and visuals. |

---


## 🗂️ Project Structure

```plaintext
ecomllm/
├── app/                  # Next.js App Router pages & APIs
│   ├── api/
│   │   └── recommend/    # AI recommendation endpoint
│   └── page.tsx          # Homepage
├── components/           # UI Components
│   ├── ProductCard.tsx
│   └── RecommendButton.tsx
├── lib/                  # Core logic and integrations
│   ├── supabase.ts       # Supabase client
│   ├── gemini.ts         # Gemini AI integration
│   ├── recommend.ts      # Recommendation logic
│   └── session.ts        # Session management
├── public/               # Static assets
├── .env.local            # Environment variables
├── package.json
└── README.md
---

🛠️ Setup & Installation
1. Clone the Repository
git clone https://github.com/your-username/ecomllm.git
cd ecomllm

2. Install Dependencies
npm install

3. Add Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key

4. Run the Development Server
npm run dev

5. Access the App

Open http://localhost:3000
 in your browser.

🧾 CSV File Format

Upload your product data in .csv format:

title,description,category,price,image_url,tags
"Noise Cancelling Headphones","Over-ear ANC","audio",149.99,"https://...","wireless|anc"
"Mechanical Keyboard","Hot-swap RGB","peripherals",89.00,"https://...","mechanical|rgb"

🔮 Future Improvements

 Add user authentication via Supabase Auth (Google/GitHub/email login)

 Implement real-time behavioral tracking to improve AI recommendations

 Build shopping cart + checkout flow

 Refine Gemini prompt engineering for contextual recommendations

 Use Supabase Edge Functions for server-side business logic

📊 Example Flow

User browses or clicks on a few products.

Supabase logs events (view, click, etc.).

/api/recommend triggers Gemini AI with behavioral data.

Gemini ranks products and returns a short explanation.

The frontend displays top recommendations with “Why this product?” details.

🧩 Technical Highlights

🔗 Next.js App Router for server actions and data fetching

🧱 Supabase for structured product data and analytics logging

🧠 Gemini AI for generating context-aware product reasoning

⚙️ Session persistence with cookies

💅 Tailwind CSS for a clean, responsive layout

👨‍💻 Author

Your Name
🌐 GitHub: your-username

💼 LinkedIn: your-linkedin
