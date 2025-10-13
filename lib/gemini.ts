import { GoogleGenerativeAI } from "@google/generative-ai";

export type Product = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  price: number;
  image_url?: string;
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function getRecommendationsFromGemini(
  products: Product[],
  limit: number = 3
): Promise<Product[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Here is a list of products:
  ${products.map((p) => `${p.id}: ${p.title} (${p.category}, $${p.price})`).join("\n")}

  Recommend the top ${limit} products that the user is most likely to engage with.
  Return only the IDs in a JSON array, e.g.: ["id1", "id2"]
  `;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const ids = JSON.parse(text);
    return products.filter((p) => ids.includes(p.id));
  } catch {
    return products.slice(0, limit);
  }
}
