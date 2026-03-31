"use client";

import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  price: number;
}

export default function BuyNowButton({ productId }: Props) {
  const router = useRouter();

  const handleBuyNow = () => {
    localStorage.setItem(
      "checkoutProducts",
      JSON.stringify([{ productId, quantity: 1 }])
    );
    router.push("/checkout");
  };

  return (
    <button
      onClick={handleBuyNow}
      className="
        w-full h-10 sm:h-11
        text-xs sm:text-sm font-medium
        rounded-md
        bg-gray-900 text-white
        hover:bg-black
        transition-all duration-200
        flex items-center justify-center
      "
    >
      Buy
    </button>
  );
}