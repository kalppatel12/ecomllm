# 🛒 E-commerce Product Recommender (Next.js + Supabase + Gemini AI)

An AI-powered **E-commerce product recommender system** built with:  

- ⚡ [Next.js 14 (App Router)](https://nextjs.org/docs/app)  
- 🛠️ [Supabase](https://supabase.com/) (PostgreSQL database, events logging)  
- 🤖 [Google Gemini AI](https://ai.google.dev/) (personalized recommendations)  
- 🎨 [Tailwind CSS](https://tailwindcss.com/) (UI styling)  

This project showcases how to combine **modern full-stack web development** with **AI-driven recommendations** in an e-commerce setting.  

---

## 📸 Screenshots  

### Homepage  
- Popular products are fetched from the database (Supabase).  
- Personalized picks are generated with Gemini AI.  

![homepage preview](https://via.placeholder.com/600x300?text=Homepage+Preview)  

### Recommendation Example  
- Click "Get Recommendations" → Gemini ranks products and explains *why*.  

![recommendation preview](https://via.placeholder.com/600x300?text=Recommendations+Preview)  

---

## ✨ Features  

- ✅ **Browse products** (stored in Supabase `products` table)  
- ✅ **Personalized recommendations** via Gemini AI (`/api/recommend`)  
- ✅ **Session tracking** with cookies (`session_id`)  
- ✅ **Events logging** (`view`, `click`, `add_to_cart`, `purchase`) in Supabase  
- ✅ **Responsive UI** with Tailwind + Next.js App Router  
- ✅ **Deployable on Vercel** with environment variables  

---
## 🗂️ Project Structure  

```plaintext
ecomllm/
├── app/                # Next.js App Router pages & API routes
│   ├── api/
│   │   └── recommend/  # API route for recommendations
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── ProductCard.tsx
│   └── RecommendButton.tsx
├── lib/                # Utility libraries
│   ├── supabase.ts     # Supabase client
│   ├── gemini.ts       # Gemini integration
│   ├── recommend.ts    # Recommendation logic
│   └── session.ts      # Session helper
├── public/             # Static assets
├── .env.local          # Environment variables
├── package.json
└── README.md

---

## 🛠️ Setup & Installation  

### 1. Clone the repo  
```bash
git clone https://github.com/your-username/ecomllm.git
cd ecomllm


---

---

## 🔮 Future Improvements  

- [ ] Add **user authentication** with Supabase Auth (Google/GitHub/email login)  
- [ ] Track **real browsing history** (events like view, click, add-to-cart) to improve recommendations  
- [ ] Add **cart system + checkout flow** to simulate full e-commerce  
- [ ] Enhance **Gemini prompts** for better, context-aware recommendations  
- [ ] Deploy Supabase **Edge Functions** for faster server-side logic  

---

## 👨‍💻 Author  

- **Your Name**  
- GitHub: [your-username](https://github.com/your-username)  
- LinkedIn: [your-linkedin](https://linkedin.com/in/your-profile)  


## 🗂️ Project Structure  

