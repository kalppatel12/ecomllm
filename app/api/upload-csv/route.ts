import { NextRequest, NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { getOrCreateSessionId } from "@/lib/session";

export const runtime = "nodejs";

const RowSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  price: z.coerce.number().nonnegative().optional().default(0),
  image_url: z.string().url().optional().nullable(),
  tags: z.string().optional().nullable(), // pipe-separated, e.g. "wireless|anc"
});

export async function POST(req: NextRequest) {
  try{
    const form = await req.formData();
    const file = form.get("file");
    const name = (form.get("name") as string) || "CSV Upload";
    if (!(file instanceof Blob)) {
      return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
    }

    const sessionId = getOrCreateSessionId();

    // Create batch
    const { data: batch, error: be } = await supabase
      .from("product_batches")
      .insert({ session_id: sessionId, name })
      .select("id")
      .single();
    if (be || !batch) throw new Error(be?.message ?? "Failed to create batch");

    const csvText = await file.text();
    const records = parse(csvText, { columns: true, skip_empty_lines: true });

    const valid = (records as unknown[]).map((r) => {
      const parsed = RowSchema.parse(r);
      return {
        batch_id: batch.id,
        title: parsed.title,
        description: parsed.description ?? null,
        category: parsed.category ?? null,
        price: parsed.price ?? 0,
        image_url: parsed.image_url ?? null,
        tags: parsed.tags ? parsed.tags.split("|").map((t) => t.trim()).filter(Boolean) : null,
      };
    });

    if (valid.length === 0) {
      return NextResponse.json({ ok: false, error: "CSV contains no valid rows." }, { status: 400 });
    }

    const { error: ie } = await supabase.from("uploaded_products").insert(valid);
    if (ie) throw new Error(ie.message);

    return NextResponse.json({
      ok: true,
      batchId: batch.id,
      inserted: valid.length,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Upload failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
