import API from "../libs/axios";

export const buyNow = async (payload: {
  products: { productId: string; quantity: number }[];
  totalPrice: number;
  address: string;
  city: string;
  phone: string;
}) => {
  const res = await API.post("/order/buy-now", payload);
  return res.data;
};

export const getUserOrders = async () => {
  const res = await API.get("/order/my-orders");
  return res.data.orders;
};

export const getAllOrders = async () => {
  const res = await API.get("/order/orders");
  return res.data.orders;
};