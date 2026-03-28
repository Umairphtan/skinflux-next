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

// ✅ CREATE ORDER SERVICE (FormData for file upload)
export const createOrder = async (data: {
  products: OrderProduct[];
  shipping: Shipping;
  paymentMethod: "COD" | "BANK";
  screenshot?: File;
}) => {
  const formData = new FormData();
  formData.append("products", JSON.stringify(data.products));
  formData.append("shipping", JSON.stringify(data.shipping));
  formData.append("paymentMethod", data.paymentMethod);
  if (data.screenshot) formData.append("screenshot", data.screenshot);

  const res = await API.post("/order", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// GET USER ORDERS
export const getMyOrders = async () => {
  const res = await API.get("/order/my");
  return res.data;
};

// GET BANK DETAILS (Admin account info)
export const getBankDetails = async () => {
  const res = await API.get("/order/detail");
  return res.data;
};