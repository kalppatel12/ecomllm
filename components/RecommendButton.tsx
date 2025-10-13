"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export type ProductProps = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  price: number;
  image_url?: string | null;
};

export default function RecommendButton({ batchId }: { batchId?: string }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<{ product: ProductProps; why: string }[]>(
    []
  );

  const onClick = async () => {
    setLoading(true);
    setItems([]);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchId, limit: 4 }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed");
      setItems(json.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert(e?.message || "Recommendation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onClick}
        disabled={loading}
        className="px-4 py-2 rounded-2xl bg-indigo-600 text-white disabled:opacity-60"
      >
        {loading ? "Finding recommendations…" : "Get Recommendations"}
      </button>

      {items.length > 0 && (
        <div className="grid sm:grid-cols-2 text-black font-bold gap-4">
          {items.map(({ product, why }) => (
            <div key={product.id} className="rounded-2xl text-black font-bold border p-4 space-y-2">
              <div className="font-semibold text-black ">
                {product.title}{" "}
                <span className="opacity-60 text-black font-bold ">(${product.price.toFixed(2)})</span>
              </div>
              <div className="text-sm opacity-80 text-black font-bold">{why}</div>
              <ProductCard p={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
