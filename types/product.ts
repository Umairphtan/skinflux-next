export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  stock: number;
  sold: number;
  status: "in-stock" | "out-of-stock" | "sold-out";
  createdAt?: string;
  updatedAt?: string;
}