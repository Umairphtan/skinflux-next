"use client";
import { useEffect, useState } from "react";
import { getCart, updateCart, removeCart, CartItem } from "@/services/cart";
import CartItemComponent from "@/components/cart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    getCart().then(res => setCart(res.cart || []));
  }, []);

  const handleUpdate = async (id: string, qty: number) => {
    await updateCart(id, qty);
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
  };

  const handleRemove = async (id: string) => {
    await removeCart(id);
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const handleCheckout = () => {
    if(cart.length === 0){
      alert("Cart is empty");
      return;
    }

    const products = cart.map(i => ({
      productId: i.product._id,
      quantity: i.quantity
    }));

    // save to localStorage
    localStorage.setItem("checkoutProducts", JSON.stringify(products));
    router.push("/checkout");
  };

  return (
    <div className="p-6">
      {cart.map(item => (
        <CartItemComponent
          key={item._id}
          item={item}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      ))}

      <h2>Total: Rs {cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}</h2>

      <button
        onClick={handleCheckout}
        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
      >
        Checkout
      </button>
    </div>
  );
}