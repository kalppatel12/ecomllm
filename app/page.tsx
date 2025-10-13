import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import CsvAndRecsClient from "@/components/CsvAndRecsClient";

// Define product type
type ProductRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  price: number | string | null;
  image_url: string | null;
};

export default async function Home() {
  const { data: popular } = await supabase
    .from("products")
    .select("*")
    .order("popularity", { ascending: false })
    .limit(8);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="mx-auto max-w-6xl p-6 space-y-12">
        {/* Page Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600">
            🛒 E-commerce Recommender
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Discover products tailored for you — powered by Supabase & Gemini AI
          </p>
        </header>

        {/* Popular products */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            🔥 Popular Products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popular?.map((p: ProductRow) => (
              <ProductCard
                key={p.id}
                p={{
                  id: p.id,
                  title: p.title,
                  description: p.description ?? undefined,
                  category: p.category ?? undefined,
                  price: Number(p.price ?? 0),
                  image_url: p.image_url ?? undefined,
                }}
              />
            ))}
          </div>
        </section>

        {/* Upload CSV + Recommendations */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
            📂 Upload Your Own Product List
          </h2>
          <div className="bg-white shadow rounded-2xl p-6">
            <CsvAndRecsClient />
          </div>
        </section>
      </div>
    </main>
  );
}
