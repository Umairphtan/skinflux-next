import { useProducts } from "@/hooks/useproduct";
import ProductCard from "@/components/productcard";

interface Props {
  params: { category: string };
}

export default function CategoryPage({ params }: Props) {
  const { products, loading } = useProducts(params.category);

  if (loading) return <p>Loading...</p>;
  if (!products.length) return <p>No products found in {params.category}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}