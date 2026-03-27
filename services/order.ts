// services/order.ts
import API from "../libs/axios";

export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface Shipping {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export const createOrder = async (data: {
  products: OrderProduct[];
  shipping: Shipping;
  paymentMethod: "COD" | "BANK";
  bankAccount?: string;
}) => {
  const res = await API.post("/order", data);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/order/my");
  return res.data;
};