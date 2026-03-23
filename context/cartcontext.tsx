"use client";

import { createContext, useContext, useState } from "react";
import * as CartService from "@/services/cart";

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  title?: string;
  price?: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (productId: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Add item
  const addItem = async (productId: string, quantity: number) => {
    try {
      const res = await CartService.addToCart({ productId, quantity });
      // ✅ Backend must return updated cart array
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  // ✅ Remove item
  const removeItem = async (id: string) => {
    try {
      const res = await CartService.removeCart(id);
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Update item quantity
  const updateItem = async (id: string, quantity: number) => {
    try {
      const res = await CartService.updateCart(id, quantity);
      if (res.cart) setCart(res.cart);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};