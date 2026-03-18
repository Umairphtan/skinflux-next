import API from "@/libs/axios";
import { ProductResponse, BestSellingResponse } from "@/types/product";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const res = await API.get("/product/");
  return res.data;
};

// GET PRODUCT BY ID
export const getProductById = async (id: string) => {
  const res = await API.get(`/product/${id}`);
  return res.data;
};

// GET CATEGORY PRODUCTS
export const getCategoryProducts = async (category: string) => {
  const res = await API.get(`/product/category/${category}`);
  return res.data;
};

// GET BEST SELLING PRODUCTS
export const getBestSellingProducts = async () => {
  const res = await API.get("/product/best-selling");
  return res.data;
};