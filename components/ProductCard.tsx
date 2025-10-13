export type ProductProps = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  price: number;
  image_url?: string;
};

export default function ProductCard({ p }: { p: ProductProps }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {p.image_url && (
        <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover rounded" />
      )}
      <h3 className="text-lg font-bold mt-2">{p.title}</h3>
      <p className="text-sm text-gray-600">{p.category}</p>
      <p className="text-gray-800 font-semibold">${p.price}</p>
    </div>
  );
}
