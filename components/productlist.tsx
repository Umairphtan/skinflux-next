"use client";

import { useProducts } from "@/hooks/useproduct";
import ProductCard from "@/components/productcard";
import { useState } from "react";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [category, setCategory] = useState<string | null>(null);

  // Categories (adjust based on backend)
  const categories = ["Serums", "Shampoos", "Face Wash", "Creams", "Oils"];

  // Filter products by selected category dynamically
  const filteredProducts = category
    ? products.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      )
    : products;

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">
        Our Products
      </h1>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button
          onClick={() => setCategory(null)}
          className={`px-4 py-2 rounded-full border ${
            !category ? "bg-pink-400 text-white" : "bg-white text-pink-400"
          } hover:bg-pink-300 transition`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              category === cat ? "bg-pink-400 text-white" : "bg-white text-pink-400"
            } hover:bg-pink-300 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in{" "}
          {category ? category : "this selection"}.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}