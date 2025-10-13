import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/lib/recommend";

export async function POST(req: NextRequest) {
  try {
    const { batchId, limit = 4 } = await req.json();
    const data = await getRecommendations({ batchId, limit });
    return NextResponse.json({ ok: true, data });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
