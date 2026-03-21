import API from "@/libs/axios"; // yahan tumhara instance ka path sahi dena
import { Product } from "@/types/product";

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const res = await API.get("/product/");
  return res.data.data;
};

// Get products by category
export const getCategoryProducts = async (category: string): Promise<Product[]> => {
  if (!category) return [];
  const res = await API.get(`/product/category/${category}`);
  return res.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  if (!id) throw new Error("Product ID is required");
  const res = await API.get(`/product/${id}`);
  console.log("Product API Response:", res.data); // debug backend
  return res.data.data; // adjust if backend returns { product: {...} }
};

// Get best selling products
export const getBestSellingProducts = async (): Promise<Product[]> => {
  const res = await API.get("/product/best-selling");
  return res.data.products;
};

// New Arrivals
export const getNewProducts = async (): Promise<Product[]> => {
  const res = await API.get("/product/new");
  return res.data.products;
};