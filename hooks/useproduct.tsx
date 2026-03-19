"use client";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  getCategoryProducts,
  getProductById,
  getBestSellingProducts,
} from "@/services/product";
import { Product } from "@/types/product";

export const useProducts = (type?: string, value?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res;

      if (type === "category" && value) {
        res = await getCategoryProducts(value);
        setProducts(res);
      } 
      else if (type === "single" && value) {
        const res = await getProductById(value);
        setProduct(res);
      } 
      else if (type === "best") {
        res = await getBestSellingProducts();
        setProducts(res);
      } 
      else {
        res = await getAllProducts();
        setProducts(res);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, value]);

  return { products, product, loading };
};