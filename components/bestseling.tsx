"use client";
import { useEffect, useState } from "react";
import { getBestSellingProducts } from "@/services/product";
import { Product } from "@/types/product";
import Link from "next/link";

export default function BestSellingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getBestSellingProducts();
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        Loading Best Selling Products...
      </div>
    );
  if (!products.length)
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        No Best Selling Products
      </div>
    );

  return (
    <div className="p-6 max-w-[1860px] mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Best Selling Products
      </h2>

      {/* Responsive slider-like grid */}
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {products.map((product) => {
            const imageUrl = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
              : "/default.jpg";

            return (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="
                  flex-shrink-0
                  bg-white border rounded-lg shadow hover:shadow-xl
                  transition-transform duration-200 transform hover:-translate-y-1
                  w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px]
                  cursor-pointer
                "
              >
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="h-40 sm:h-44 md:h-48 w-full object-cover rounded-t-lg"
                />
                <div className="p-3 flex flex-col">
                  <h3 className="font-semibold text-gray-800 truncate text-sm sm:text-base md:text-base">
                    {product.title}
                  </h3>
                  <p className="text-pink-600 font-bold mt-1 text-sm sm:text-base">
                    Rs {product.price}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Stock: {product.stock || 0}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}