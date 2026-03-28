"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder, OrderProduct, Shipping, getBankDetails } from "@/services/order";

export default function CheckoutPage() {
  const router = useRouter();
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [shipping, setShipping] = useState<Shipping>({ name:"", phone:"", address:"", city:"" });
  const [paymentMethod, setPaymentMethod] = useState<"COD"|"BANK">("COD");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [bankInfo, setBankInfo] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutProducts");
    if (stored) {
      setProducts(JSON.parse(stored));
    }

    // 🔹 fetch admin bank info
    getBankDetails().then(res => setBankInfo(res.data)).catch(console.log);
  }, []);

  const handleSubmit = async () => {
    if (!products.length) return alert("Products are required");
    if (!shipping.name || !shipping.phone || !shipping.address || !shipping.city) return alert("All shipping fields required");
    if (paymentMethod === "BANK" && !screenshot) return alert("Bank screenshot required");

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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Shipping & Payment</h1>

      <input type="text" placeholder="Name" value={shipping.name} onChange={e => setShipping({ ...shipping, name: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" placeholder="Phone" value={shipping.phone} onChange={e => setShipping({ ...shipping, phone: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" placeholder="Address" value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} className="w-full mb-2 p-2 border rounded"/>
      <input type="text" placeholder="City" value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} className="w-full mb-2 p-2 border rounded"/>

      <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value as any)} className="w-full mb-2 p-2 border rounded">
        <option value="COD">Cash on Delivery</option>
        <option value="BANK">Bank Transfer</option>
      </select>

      {paymentMethod === "BANK" && bankInfo && (
        <div className="mb-2 p-2 border rounded bg-gray-50">
          <p>Account Name: {bankInfo.accountName}</p>
          <p>Account Number: {bankInfo.accountNumber}</p>
          <p>Bank: {bankInfo.bankName}</p>
          <p>Branch: {bankInfo.branch}</p>
          <input type="file" accept="image/*" onChange={e => e.target.files && setScreenshot(e.target.files[0])} className="mt-2"/>
        </div>
      )}

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Place Order</button>
    </div>
  );
}