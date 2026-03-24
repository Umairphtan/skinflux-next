"use client";

import { createContext, useContext, useState, useEffect } from "react";
import * as CartService from "@/services/cart";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: { title: string; price: number };
}

interface CartContextType {
  cart: CartItem[];
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const res = await CartService.getCart();
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error("Fetch cart failed", err);
    }
  };

  useEffect(() => {
    fetchCart(); // load cart on app start
  }, []);

  const addItem = async (productId: string, quantity: number) => {
    try {
      const res = await CartService.addToCart({ productId, quantity });
      if (res.cart) setCart(res.cart);
    } catch (err: any) {
      if (err.response?.status === 401) throw new Error("Unauthorized");
      console.error(err);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const res = await CartService.removeCart(id);
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async (id: string, quantity: number) => {
    try {
      const res = await CartService.updateCart(id, quantity);
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};