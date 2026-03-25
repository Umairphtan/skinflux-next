"use client";

import { useState } from "react";
import { checkoutWithShipment } from "@/services/shipment";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ productId }: { productId: string }) {
  const router = useRouter();

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    quantity: 1,
    paymentMethod: "cash",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await checkoutWithShipment({
        productId,
        ...form,
      });

      alert("Order placed with shipment ✅");
      router.push("/orders");

    } catch (err: any) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input name="address" placeholder="Address" onChange={handleChange} className="input"/>
      <input name="city" placeholder="City" onChange={handleChange} className="input"/>
      <input name="state" placeholder="State" onChange={handleChange} className="input"/>
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} className="input"/>
      <input name="country" placeholder="Country" onChange={handleChange} className="input"/>
      <input name="phone" placeholder="Phone" onChange={handleChange} className="input"/>

      <select name="paymentMethod" onChange={handleChange} className="input">
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full py-2"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}