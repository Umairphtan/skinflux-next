import axios from "axios";
import { Product } from "../types/product";

const API_URL = "http://localhost:5000/api/v2/product"; // backend route

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/`);
  return res.data.data;
};

export const getCategoryProducts = async (category?: string): Promise<Product[]> => {
  if (!category) {
    console.error("getCategoryProducts: category undefined!");
    return []; // fallback empty array
  }

  const res = await axios.get(`${API_URL}/category/${category.toLowerCase()}`);
  return res.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data.data;
};

export const getBestSellingProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${API_URL}/best-selling`);
  return res.data.products;
};