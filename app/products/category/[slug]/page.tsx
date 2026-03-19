"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCategoryProducts } from "@/services/product";
import { Product } from "@/types/product";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getCategoryProducts(slug);
        setProducts(data);
      } catch (err) {
        console.error("Category Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug} Products</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded shadow">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/image/${product.image}`}
                alt={product.title}
                className="h-48 w-full object-cover rounded"
              />
              <h2 className="font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-700 mt-1">Rs {product.price}</p>
              {product.stock > 0 ? (
                <p className="text-green-600 text-sm mt-1">In stock ({product.stock})</p>
              ) : (
                <p className="text-red-600 text-sm mt-1">Out of stock</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}