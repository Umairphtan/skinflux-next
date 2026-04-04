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

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);

      // Initialize maxPrice
      const max = data.reduce((m, p) => Math.max(m, p.price || 0), 0);
      setMaxPrice(max);
    });
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (priceSort === "low") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (priceSort === "high") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => (p.price || 0) <= maxPrice);
    }

    setFilteredProducts(filtered);
  }, [search, category, priceSort, maxPrice, products]);

  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-indigo-700 text-white py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Our Products</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 px-3 sm:px-6 mt-6">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 bg-white p-6 rounded-xl shadow-lg">
          <div className="md:sticky md:top-6 max-h-screen overflow-y-auto">
            <h2 className="font-semibold mb-4 text-lg text-gray-700">Filters</h2>

            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full mb-4 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Category */}
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              className="w-full mb-4 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            {/* Price Range */}
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Max Price: Rs {maxPrice}
            </label>
            <input
              type="range"
              min={0}
              max={products.reduce((max, p) => Math.max(max, p.price || 0), 0)}
              value={maxPrice || 0}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mb-4 accent-indigo-600"
            />

            {/* Price Sort */}
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Sort by Price
            </label>
            <select
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
            >
              <option value="none">Default</option>
              <option value="low">Low → High</option>
              <option value="high">High → Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
              >
                {/* Image + Title */}
                <Link href={`/products/${product._id}`}>
                  <img
                    src={
                      product.image
                        ? `http://localhost:5000/uploads/${product.image}`
                        : "/default.jpg"
                    }
                    alt={product.title}
                    className="w-full h-32 sm:h-40 object-cover rounded-md"
                  />
                  <h2 className="text-sm sm:text-base font-semibold text-gray-800 mt-2 line-clamp-1">
                    {product.title}
                  </h2>
                </Link>

                {/* Price */}
                <p className="text-pink-600 font-bold text-sm sm:text-base mt-1">
                  Rs {product.price}
                </p>

                {/* Stock */}
                <p className="text-xs text-gray-500 font-medium">
                  {product.stock > 0 ? `Stock: ${product.stock}` : "Sold Out"}
                </p>

                {/* Description */}
                <p
                  className="text-xs sm:text-sm text-gray-600 mt-1 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.description || "No description available"}
                </p>

                {/* See More */}
                <Link
                  href={`/products/${product._id}`}
                  className="text-pink-600 text-xs font-semibold mt-1 hover:underline"
                >
                  See More →
                </Link>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto pt-2">
                  <div className="flex-1">
                    <AddToCartButton
                      productId={product._id}
                      stock={product.stock || 0}
                    />
                  </div>
                  <div className="flex-1">
                    <BuyNowButton
                      productId={product._id}
                      price={product.price || 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}