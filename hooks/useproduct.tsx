import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import {
  getProducts,
  getCategoryProducts,
  getBestSellingProducts,
} from "@/services/product";

export const useProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let res;
        if (category) {
          res = await getCategoryProducts(category);
          setProducts(res.data);
        } else {
          res = await getProducts();
          setProducts(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return { products, loading };
};

export const useBestSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBest = async () => {
      try {
        const res = await getBestSellingProducts();
        setProducts(res.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBest();
  }, []);

  return { products, loading };
};