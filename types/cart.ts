export interface Product {
  _id: string;
  title: string;
  price: number;
  images?: string[];
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}