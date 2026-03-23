"use client";

import { useEffect, useState } from "react";
import { getCart, updateCart, removeCart } from "@/services/cart";
import CartItem from "@/components/cart";
import { CartItem as Item } from "@/types/cart";

export default function CartPage() {
  const [cart, setCart] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.cart);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async (id: string, qty: number) => {
    if (qty < 1) return;

    try {
      await updateCart(id, qty);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeCart(id);
      fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-pink-50 p-6">
      <h1 className="text-2xl font-bold text-pink-600 mb-6">
        Your Cart 🛒
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item._id}
            item={item}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold">
          Total: Rs. {total}
        </h2>
      </div>
    </div>
  );
}