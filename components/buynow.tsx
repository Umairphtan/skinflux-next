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
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      Buy Now
    </button>
  );
}