"use client";

import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  price: number;
}

export default function BuyNowButton({ productId, price }: Props) {
  const router = useRouter();

  const handleBuyNow = () => {
    if (!productId || !price) {
      alert("Product info missing!");
      return;
    }

    // Navigate to checkout page with query params
    router.push(`/checkout/${productId}?price=${price}`);
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
    >
      Buy Now
    </button>
  );
}