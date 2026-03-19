"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/product";
import { Product } from "@/types/product";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error("Product Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

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
    </div>
  );
}