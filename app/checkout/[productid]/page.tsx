"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import API from "@/libs/axios";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { productid } = params; // <-- lowercase
  const price = Number(searchParams.get("price") || 0);
  const title = searchParams.get("title") || "";

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!productid) return alert("Product ID missing!");
    if (!address || !city || !phone) return alert("Please fill all shipment details!");

    setLoading(true);
    try {
      await API.post("/order/buy-now", {
        products: [{ productId: productid, quantity: 1 }],
        totalPrice: price,
        address,
        city,
        phone,
      });

      alert("Order placed successfully!");
      router.push("/orders"); // user orders page
    } catch (err: any) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-20 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Checkout: {title}</h1>

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}