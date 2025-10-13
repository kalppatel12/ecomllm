export type ProductProps = {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  price: number;
  image_url?: string | null; // still exists in case you want it later, but unused
};

export default function ProductCard({ p }: { p: ProductProps }) {
  return (
    <div className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition duration-300 p-5 space-y-3">
      {/* Category Badge */}
      {p.category && (
        <span className="inline-block bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow">
          {p.category}
        </span>
      )}

      {/* Title */}
      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
        {p.title}
      </h3>

      {/* Description */}
      {p.description && (
        <p className="text-sm text-gray-700 line-clamp-2">{p.description}</p>
      )}

      {/* Price */}
      <div className="pt-2">
        <span className="text-xl font-bold text-emerald-600">
          ${p.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
