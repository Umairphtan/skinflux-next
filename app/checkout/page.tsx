"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder, OrderProduct, Shipping } from "@/services/order";

export default function CheckoutPage() {
  const router = useRouter();
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [shipping, setShipping] = useState<Shipping>({ name:"", phone:"", address:"", city:"" });
  const [paymentMethod, setPaymentMethod] = useState<"COD"|"BANK">("COD");
  const [bankAccount, setBankAccount] = useState("");

 useEffect(() => {
  const stored = localStorage.getItem("checkoutProducts");
  if(stored){
    const parsed = JSON.parse(stored);
    setProducts(parsed.map((i: any) => ({
      productId: i.productId,
      quantity: i.quantity || 1
    })));
  }
  // ⚠️ empty dependency array ensures this runs only once
}, []);

  const handleSubmit = async () => {
    if(!products || products.length === 0){
      alert("Products are required");
      return;
    }

    try{
      await createOrder({ products, shipping, paymentMethod, bankAccount });
      alert("Order placed successfully!");
      localStorage.removeItem("checkoutProducts");
      router.push("/");
    } catch(err: any){
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Shipping & Payment</h1>
      <input type="text" placeholder="Name" value={shipping.name} onChange={e=>setShipping({...shipping,name:e.target.value})} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="Phone" value={shipping.phone} onChange={e=>setShipping({...shipping,phone:e.target.value})} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="Address" value={shipping.address} onChange={e=>setShipping({...shipping,address:e.target.value})} className="w-full mb-2 p-2 border rounded" />
      <input type="text" placeholder="City" value={shipping.city} onChange={e=>setShipping({...shipping,city:e.target.value})} className="w-full mb-2 p-2 border rounded" />

      <select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value as any)} className="w-full mb-2 p-2 border rounded">
        <option value="COD">Cash on Delivery</option>
        <option value="BANK">Bank Transfer</option>
      </select>

      {paymentMethod==="BANK" && (
        <input type="text" placeholder="Bank Account Number" value={bankAccount} onChange={e=>setBankAccount(e.target.value)} className="w-full mb-2 p-2 border rounded"/>
      )}

      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Place Order</button>
    </div>
  )
}