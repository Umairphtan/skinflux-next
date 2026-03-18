import { useBestSelling } from "@/hooks/useproduct";
import ProductCard from "../components/productcard";

export default function BestSelling() {
  const { products, loading } = useBestSelling();

  if (loading) return <p>Loading best selling products...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-pink-500">Best Selling</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}