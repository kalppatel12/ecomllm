"use client";

import { useState } from "react";
import ProductCard, { ProductProps } from "./ProductCard";

export default function RecommendButton() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductProps[]>([]);

  async function handleClick() {
    setLoading(true);
    const res = await fetch("/api/recommend", {
      method: "POST",
      body: JSON.stringify({ limit: 3 }),
    });
    const data = await res.json();
    if (data.ok) setProducts(data.data);
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
