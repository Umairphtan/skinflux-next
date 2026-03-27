"use client";
import { useState } from "react";
import { Shipping } from "@/types/order";

interface Props {
  onSubmit: (shipping: Shipping) => void;
}

export default function ShippingForm({ onSubmit }: Props) {
  const [shipping, setShipping] = useState<Shipping>({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(shipping);
      }}
      className="flex flex-col gap-2"
    >
      <input
        name="name"
        placeholder="Full Name"
        value={shipping.name}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="phone"
        placeholder="Phone Number"
        value={shipping.phone}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={shipping.address}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <input
        name="city"
        placeholder="City"
        value={shipping.city}
        onChange={handleChange}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Continue to Payment
      </button>
    </form>
  );
}