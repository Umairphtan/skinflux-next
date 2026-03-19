"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/services/product";
import { Product } from "@/types/product";

export default function ProductPage() {
  const { id} = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        console.error("Product Error:", err);
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 mt-20">Loading...</div>;
  if (error) return <div className="p-6 mt-20 text-red-500">{error}</div>;
  if (!product) return <div className="p-6 mt-20">Product not found</div>;

  return (
    <div className="p-6 mt-20 max-w-4xl mx-auto">
      <img
        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/product/image/${product.image}`}
        alt={product.title}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="text-xl font-semibold mt-4">Rs {product.price}</p>
      <p className="mt-2 text-sm">
        {product.stock > 0 ? "In stock" : "Out of stock"}
      </p>
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
}