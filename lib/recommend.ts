import { supabase } from "@/lib/supabase";
import { explainRecommendation, pickTopN, Product } from "@/lib/gemini";
import { getOrCreateSessionId } from "@/lib/session";

type Row = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | string | null;
  image_url: string | null;
  tags: string[] | null;
  popularity?: number | null;
};

function normalize(rows: Row[]): Product[] {
  return (rows ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description ?? undefined,
    category: r.category ?? undefined,
    price: Number(r.price ?? 0),
    image_url: r.image_url ?? undefined,
    tags: r.tags ?? undefined,
  }));
}

/**
 * Get recommendations either from:
 * - uploaded_products for a given batchId, or
 * - global products table (fallback)
 */
export async function getRecommendations({
  batchId,
  limit = 4,
}: { batchId?: string; limit?: number }) {
  const sessionId = getOrCreateSessionId();

  let rows: Row[] = [];
  if (batchId) {
    const { data, error } = await supabase
      .from("uploaded_products")
      .select("*")
      .eq("batch_id", batchId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!error && data) rows = data as any;
  }

  if (!batchId || rows.length === 0) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("popularity", { ascending: false })
      .limit(50);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!error && data) rows = data as any;
  }

  const products = normalize(rows);
  if (products.length === 0) return [];

  const ids = await pickTopN(products, limit);
  const selected = products.filter((p) => ids.includes(p.id)).slice(0, limit);

  const behaviorSummary = batchId
    ? `User uploaded a custom product list (batch ${batchId}).`
    : `Popular items from the catalog.`;

  // Log impressions
  await Promise.all(
    selected.map((p) =>
      supabase.from("events").insert({
        session_id: sessionId,
        product_id: p.id,
        type: "view",
      })
    )
  );

  const withWhy = await Promise.all(
    selected.map(async (p) => ({
      product: p,
      why: await explainRecommendation(p, behaviorSummary),
    }))
  );

  return withWhy;
}
