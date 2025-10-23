# 🧠 EcomLLM — AI-Powered Product Recommendation Engine

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

## 🛠️ Setup & Installation

### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/ecomllm.git
cd ecomllm
```

### 🔹 Step 2: Install Dependencies
```bash
npm install
```

### 🔹 Step 3: Add Environment Variables
Create a `.env.local` file in the root directory and add your credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 🔹 Step 4: Run the Development Server
```bash
npm run dev
```

### 🔹 Step 5: Access the App  
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧾 CSV File Format

Upload your product data in `.csv` format with the following structure:

| Column | Description |
|---------|-------------|
| **title** | Product name |
| **description** | Short details about the product |
| **category** | Product category (e.g., audio, peripherals) |
| **price** | Product price |
| **image_url** | URL to product image |
| **tags** | Keywords separated by `|` for AI reference |

### 🔹 Example
```csv
title,description,category,price,image_url,tags
"Noise Cancelling Headphones","Over-ear ANC","audio",149.99,"https://...","wireless|anc"
"Mechanical Keyboard","Hot-swap RGB","peripherals",89.00,"https://...","mechanical|rgb"
```
### 🔹 Sample CSV File Link
```csv
"https://drive.google.com/file/d/1OBjFSemrsaqGqOoHxN7diTYSHc3uxFro/view?usp=sharing"
```
---

## 🔮 Future Improvements
- Add user authentication via Supabase Auth (Google/GitHub/email login)  
- Implement real-time behavioral tracking to improve AI recommendations  
- Build shopping cart + checkout flow  
- Refine Gemini prompt engineering for contextual recommendations  
- Use Supabase Edge Functions for server-side business logic  

---

## 📊 Example Flow

1. User browses or clicks on a few products.  
2. Supabase logs events (view, click, etc.).  
3. `/api/recommend` triggers Gemini AI with behavioral data.  
4. Gemini ranks products and returns a short explanation.  
5. The frontend displays top recommendations with “Why this product?” details.  

---

## 🧩 Technical Highlights
- 🔗 **Next.js App Router** for server actions and data fetching  
- 🧱 **Supabase** for structured product data and analytics logging  
- 🧠 **Gemini AI** for generating context-aware product reasoning  
- ⚙️ **Session persistence** with cookies  
- 💅 **Tailwind CSS** for a clean, responsive layout  

---

