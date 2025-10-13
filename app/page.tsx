import { supabase } from "@/lib/supabase";
import ProductCard, { ProductProps } from "@/components/ProductCard";
import RecommendButton from "@/components/RecommendButton";

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("popularity", { ascending: false })
    .limit(8);

  if (error) console.error(error);

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">E-commerce Recommender</h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Popular products</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {products?.map((p: ProductProps) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Personalized picks</h2>
        <RecommendButton />
      </section>
    </main>
  );
}
