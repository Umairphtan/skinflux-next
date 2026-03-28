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
    setCart(prev =>
      prev.map(i => (i._id === id ? { ...i, quantity: qty } : i))
    );
  };

  const handleRemove = async (id: string) => {
    await removeCart(id);
    setCart(prev => prev.filter(i => i._id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const products = cart.map(i => ({
      productId: i.product._id,
      quantity: i.quantity
    }));

    localStorage.setItem("checkoutProducts", JSON.stringify(products));
    router.push("/checkout");
  };

  const total = cart.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm">Start adding products to see them here</p>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="space-y-4">
            {cart.map(item => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-4 border"
              >
                <CartItemComponent
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </div>

          {/* TOTAL + CHECKOUT */}
          <div className="mt-8 bg-gray-100 p-6 rounded-xl shadow-md flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: <span className="text-green-600">Rs {total}</span>
            </h2>

            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 transition text-white px-6 py-2 rounded-lg font-medium"
            >
              Proceed to Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}