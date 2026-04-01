"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder, OrderProduct, Shipping, getBankDetails } from "@/services/order";

export default function CheckoutPage() {
  const router = useRouter();
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [shipping, setShipping] = useState<Shipping>({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BANK">("COD");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [bankInfo, setBankInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutProducts");
    if (stored) setProducts(JSON.parse(stored));

    // 🔹 fetch admin bank info
    getBankDetails().then(res => setBankInfo(res.data)).catch(console.log);
  }, []);

  const handleSubmit = async () => {
    if (!products.length) return alert("Products are required");
    if (!shipping.name || !shipping.phone || !shipping.address || !shipping.city)
      return alert("All shipping fields required");
    if (paymentMethod === "BANK" && !screenshot)
      return alert("Bank screenshot required");

    try {
      await createOrder({ products, shipping, paymentMethod, screenshot: screenshot || undefined });
      alert("Order placed successfully!");
      localStorage.removeItem("checkoutProducts");
      router.push("/");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4 md:p-10">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Checkout</h1>

        {/* Shipping Info */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Full Name"
            value={shipping.name}
            onChange={e => setShipping({ ...shipping, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="text"
            placeholder="Phone"
            value={shipping.phone}
            onChange={e => setShipping({ ...shipping, phone: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="text"
            placeholder="Address"
            value={shipping.address}
            onChange={e => setShipping({ ...shipping, address: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <input
            type="text"
            placeholder="City"
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="font-semibold text-gray-700">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value as any)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          >
            <option value="COD">Cash on Delivery</option>
            <option value="BANK">Bank Transfer</option>
          </select>
        </div>

        {/* Bank Transfer Info */}
        {paymentMethod === "BANK" && bankInfo && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-2">Bank Details</h2>
            <p className="text-gray-600">Account Name: {bankInfo.accountName}</p>
            <p className="text-gray-600">Account Number: {bankInfo.accountNumber}</p>
            <p className="text-gray-600">Bank: {bankInfo.bankName}</p>
            <p className="text-gray-600">Branch: {bankInfo.branch}</p>

            <input
              type="file"
              accept="image/*"
              onChange={e => e.target.files && setScreenshot(e.target.files[0])}
              className="mt-3 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-black hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}