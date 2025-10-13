import { GoogleGenerativeAI } from "@google/generative-ai";

export type Product = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  price: number;
  image_url?: string | null;
  tags?: string[] | null;
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function explainRecommendation(
  product: Product,
  behaviorSummary: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `Explain in 1-2 short sentences why "${product.title}" ($${product.price}) is a good pick based on: ${behaviorSummary}. Be specific to category/tags/price.`;
  const res = await model.generateContent(prompt);
  return res.response.text().trim();
}

/**
 * Rank a set of products and return top N ids.
 * Safe fallback: return first N if parsing fails.
 */
export async function pickTopN(products: Product[], n = 4): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const list = products
    .map((p) => `${p.id} :: ${p.title} | ${p.category ?? ""} | $${p.price} | [${(p.tags ?? []).join(", ")}]`)
    .join("\n");

  const prompt = `
You are ranking products. Given this list:
${list}

Return the BEST ${n} product IDs as a JSON array of strings only. Example:
["id1","id2","id3","id4"]
  `;
  const res = await model.generateContent(prompt);
  const text = res.response.text();
  try {
    const ids = JSON.parse(text);
    if (Array.isArray(ids)) return ids.slice(0, n);
  } catch {}
  return products.slice(0, n).map((p) => p.id);
}
