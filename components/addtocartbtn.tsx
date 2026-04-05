"use client";

import { useState } from "react";
import { useCart } from "@/context/cartcontext";
import { addToGuestCart } from "@/libs/gusetcard";

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

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      if (token) {
        // ✅ Logged-in user → backend
        await addItem(productId, 1);
      } else {
        // ✅ Guest user → localStorage
        addToGuestCart(productId, 1);
      }

      setAdded(true);
      alert("Product added to cart ✅");

      setTimeout(() => setAdded(false), 2000);
    } catch (err: any) {
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || stock === 0}
      className={`
        w-full h-10 sm:h-11
        text-xs sm:text-sm font-medium
        rounded-md
        transition-all duration-200
        flex items-center justify-center
        ${
          stock === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : added
            ? "bg-green-500 text-white"
            : "bg-pink-500 hover:bg-pink-600 text-white"
        }
      `}
    >
      {loading ? "Adding..." : added ? "Added ✓" : "Add"}
    </button>
  );
} 