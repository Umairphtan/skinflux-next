export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product | Product[];
}

export interface BestSellingResponse {
  success: boolean;
  products: Product[];
}