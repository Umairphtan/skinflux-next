"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";
import BuyNowButton from "@/components/buynow";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Filter products as user types
  useEffect(() => {
    if (!search) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500 font-medium">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Top Banner */}
      <div className="w-full bg-indigo-700 py-12 text-center text-white mb-8 shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          Our Products
        </h1>
        <p className="text-sm md:text-base mt-2 text-indigo-200">
          Explore our latest collection of products
        </p>
      </div>

      {/* 🔹 Search Bar */}
      <div className="max-w-md mx-auto mb-6 px-6">
        <input
          type="text"
          placeholder="Search products by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* 🔹 Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 pb-12">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 mt-10">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col bg-white"
              style={{ height: "450px" }}
            >
              {/* Image + Title */}
              <Link href={`/products/${product._id}`} className="cursor-pointer">
                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "/default.jpg"
                  }
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="font-bold text-lg truncate">{product.title}</h2>
              </Link>

              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-green-600 font-semibold mt-1">
                ${product.price.toFixed(2)}
              </p>

              {/* Stock */}
              {product.stock && product.stock > 0 ? (
                <p className="text-gray-500 text-sm mt-1">Stock: {product.stock}</p>
              ) : (
                <p className="text-red-600 font-bold text-sm mt-1">Sold Out</p>
              )}

              {/* Description */}
              <p
                className="text-gray-700 text-sm mt-2 overflow-hidden flex-grow"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 6,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.description || "No description available"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <AddToCartButton
                  productId={product._id}
                  stock={product.stock || 0}
                />
                <BuyNowButton
                  productId={product._id}
                  price={product.price || 0}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}