"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { buyNow } from "@/services/order";

interface Props {
  productId: string;
  quantity: number;
  totalPrice: number;
}

export default function ShipmentForm({ productId, quantity, totalPrice }: Props) {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !city || !phone) return alert("Sab fields fill karein");

    setLoading(true);
    try {
      await buyNow({
        products: [{ productId, quantity }],
        totalPrice,
        address,
        city,
        phone,
      });
      alert("Order successfully placed!");
      router.push("/orders");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto mt-6">
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
        className="border p-2 rounded"
      />
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
        className="border p-2 rounded"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
        className="border p-2 rounded"
      />
      <button type="submit" disabled={loading} className="bg-green-600 text-white p-2 rounded">
        {loading ? "Placing..." : "Place Order"}
      </button>
    </form>
  );
}