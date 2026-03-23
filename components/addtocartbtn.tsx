"use client";

import { addToCart } from "@/services/cart";

export default function AddToCartButton({
  productId,
}: {
  productId: string;
}) {
  const handleAdd = async () => {
    try {
      await addToCart(productId, 1);
      alert("Added to cart");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-2 bg-black text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}