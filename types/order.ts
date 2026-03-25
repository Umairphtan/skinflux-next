export interface ProductItem {
  productId: string;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  products: ProductItem[];
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export interface Shipment {
  _id: string;
  order: string;
  address: string;
  city: string;
  phone: string;
  courier: string;
  status: "pending" | "shipped" | "delivered";
  shippedAt?: string;
  deliveredAt?: string;
}

export interface BuyNowPayload {
  userId: string;
  products: ProductItem[];
  totalPrice: number;
  address: string;
  city: string;
  phone: string;
}