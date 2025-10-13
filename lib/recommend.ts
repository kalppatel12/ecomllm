import { supabase } from "@/lib/supabase";
import { getRecommendationsFromGemini, Product } from "@/lib/gemini";
import { getOrCreateSessionId } from "@/lib/session";

/**
 * Fetch recommended products for a given session
 */
export async function getRecommendations(
  limit: number = 3
): Promise<{ product: Product; why: string }[]> {
  // Get current session
  const sessionId = getOrCreateSessionId();

  // Fetch all products from Supabase
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error || !products) {
    console.error("Error fetching products:", error?.message);
    return [];
  }

  // Generate recommendations using Gemini
  const recommendedProducts = await getRecommendationsFromGemini(products, limit);

  // Log recommendations as "view" events in Supabase
  for (const product of recommendedProducts) {
    await supabase.from("events").insert({
      session_id: sessionId,
      product_id: product.id,
      type: "view",
    });
  }

  // Return products with explanation
  return recommendedProducts.map((p) => ({
    product: {
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      price: Number(p.price),
      image_url: p.image_url,
    },
    why: `Recommended because Gemini ranked this as relevant.`
  }));
}
