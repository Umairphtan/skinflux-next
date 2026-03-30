"use client";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  price: number;
}

export default function BuyNowButton({ productId, price }: Props) {
  const router = useRouter();

  const handleBuyNow = () => {
    // localStorage me product save karo
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
        bg-gray-800 text-white
        px-2 py-1   /* very compact */
        text-sm font-medium
        rounded
        shadow-sm
        hover:bg-gray-900 hover:shadow-md
        transition-all duration-200
        focus:outline-none focus:ring-1 focus:ring-gray-500
      "
    >
      Buy Now
    </button>
  );
}