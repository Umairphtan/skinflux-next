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
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-lg font-medium">Your cart is empty</p>
          <p className="text-sm mt-1">Start adding products to see them here</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cart.map(item => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 border hover:shadow-lg transition"
              >
                <CartItemComponent
                  item={item}
                  onUpdate={handleUpdate}
                  onRemove={handleRemove}
                />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Subtotal:</span>
              <span>Rs {total}</span>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Shipping:</span>
              <span>Rs 0</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rs {total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition"
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}