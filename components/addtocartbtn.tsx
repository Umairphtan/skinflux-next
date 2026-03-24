"use client";

import { useState } from "react";
import { useCart } from "@/context/cartcontext";

interface Props {
  productId: string;
  stock: number;
}

export default function AddToCartButton({ productId, stock }: Props) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    if (stock === 0) return;
    try {
      setLoading(true);
      await addItem(productId, 1);
      setAdded(true);
      alert("Product added to cart ✅");
      setTimeout(() => setAdded(false), 2000);
    } catch (err: any) {
      if (err.message === "Unauthorized") {
        alert("Please login to add products to your cart");
        return;
      }
      console.error(err);
      alert("Failed to add to cart 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || stock === 0}
      className={`mt-3 w-full py-2 rounded-lg font-medium transition ${
        stock === 0
          ? "bg-gray-400 cursor-not-allowed"
          : added
          ? "bg-green-500 text-white cursor-default"
          : "bg-pink-500 hover:bg-pink-600 text-white"
      }`}
    >
      {loading ? "Adding..." : added ? "Added ✅" : "Add to Cart"}
    </button>
  );
}