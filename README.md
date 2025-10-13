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

## 📸 Screenshots

### 🏠 Homepage  
- Displays trending products from Supabase.  
- Personalized picks powered by Gemini AI.  

![homepage preview](https://via.placeholder.com/600x300?text=Homepage+Preview)

### 🤖 Recommendation Example  
- Click **“Get Recommendations”** → Gemini ranks products and explains *why*.  

![recommendation preview](https://via.placeholder.com/600x300?text=Recommendations+Preview)

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
