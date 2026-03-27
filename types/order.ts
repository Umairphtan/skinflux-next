export interface Shipping {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderProduct {
  productId: string;
  quantity: number;
}

export interface Order {
  _id?: string;
  user?: string;
  products: OrderProduct[];
  totalPrice: number;
  shipping: Shipping;
  paymentMethod: "COD" | "BANK";
  bankAccount?: string;
  paymentStatus?: "pending" | "paid";
  orderStatus?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}