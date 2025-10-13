import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getRecommendationsFromGemini } from "@/lib/gemini";
import { getOrCreateSessionId } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { limit = 3 } = await req.json();
    const sessionId = getOrCreateSessionId();

    // Get all products
    const { data: products, error } = await supabase.from("products").select("*");
    if (error || !products) throw new Error(error?.message || "No products");

    // Ask Gemini
    const recs = await getRecommendationsFromGemini(products, limit);

    // Log event
    for (const r of recs) {
      await supabase.from("events").insert({
        session_id: sessionId,
        product_id: r.id,
        type: "view",
      });
    }

    return NextResponse.json({ ok: true, data: recs });
  } catch (e: unknown) {
    let msg = "Unknown error";
    if (e instanceof Error) msg = e.message;
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
