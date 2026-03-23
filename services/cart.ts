// services/cart.ts
import API from "../libs/axios";

interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export const addToCart = async (payload: { productId: string; quantity: number }) => {
  const res = await API.post("/cart/add", payload);
  // ✅ backend should return updated cart array
  // Example response: { cart: [{ _id, productId, quantity, ...}, ...] }
  return res.data;
};

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const updateCart = async (id: string, quantity: number) => {
  const res = await API.put(`/cart/update/${id}`, { quantity });
  return res.data;
};

export const removeCart = async (id: string) => {
  const res = await API.delete(`/cart/remove/${id}`);
  return res.data;
};