"use client";
import { useEffect, useState } from "react";
import { getBestSellingProducts } from "@/services/product";
import { Product } from "@/types/product";
import Link from "next/link";

export default function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getBestSellingProducts();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading Best Selling...</div>;
  if (!products.length) return <div>No Best Selling Products</div>;

  return (
    <div className="p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Best Selling Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => {
          const imageUrl = product.image
            ? product.image.startsWith("http")
              ? product.image
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
            : "/default.jpg";

          return (
            <Link key={product._id} href={`/products/${product._id}`} className="border p-4 rounded shadow hover:shadow-lg">
              <img src={imageUrl} alt={product.title} className="h-48 w-full object-cover rounded" />
              <h3 className="font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-700 mt-1">Rs {product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}