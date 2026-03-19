"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};