// services/cart.ts
import API from "../libs/axios";

export interface CartItem {
  _id: string; // cart item id
  product: {
    _id: string;
    title: string;
    price: number;
    stock: number;
  };
  quantity: number;
}

// Add to cart
export const addToCart = async (payload: { productId: string; quantity: number }) => {
  const res = await API.post("/cart/add", payload);
  return res.data;
};

// Get cart items
export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Update cart quantity
export const updateCart = async (id: string, quantity: number) => {
  const res = await API.put(`/cart/update/${id}`, { quantity });
  return res.data;
};

// Remove cart item
export const removeCart = async (id: string) => {
  const res = await API.delete(`/cart/remove/${id}`);
  return res.data;
};