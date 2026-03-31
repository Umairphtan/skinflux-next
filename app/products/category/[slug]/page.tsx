"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryProducts } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";
import BuyNowButton from "@/components/buynow";

export default function CategoryPage() {
  const { slug } = useParams() as { slug?: string };

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("none");

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getCategoryProducts(slug);
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  // 🔹 Search + Sort
  useEffect(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (priceSort === "low") {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (priceSort === "high") {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    setFilteredProducts(filtered);
  }, [search, priceSort, products]);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔹 Banner */}
      <div className="bg-pink-400 text-white py-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold capitalize">
          {slug} Products
        </h1>
      </div>

      {/* 🔹 Layout */}
      <div className="flex flex-col md:flex-row gap-4 px-3 sm:px-6 mt-6">

    
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="font-semibold mb-3">Filters</h2>

          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="w-full mb-3 px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Price Sort */}
          <select
            className="w-full px-3 py-2 border rounded-lg text-sm"
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="none">Sort Price</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

        {/* 🔸 Products */}
        <div className="flex-1">

          {filteredProducts.length === 0 ? (
            <p className="text-center mt-20 text-gray-500">
              No products found
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">

              {filteredProducts.map((product) => {
                const imageUrl = product.image
                  ? product.image.startsWith("http")
                    ? product.image
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
                  : "/default.jpg";

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col"
                  >
                    {/* Image */}
                    <Link href={`/products/${product._id}`}>
                      <img
                        src={imageUrl}
                        className="w-full h-32 sm:h-40 object-cover rounded-md"
                      />
                      <h2 className="text-sm font-medium mt-2 line-clamp-1">
                        {product.title}
                      </h2>
                    </Link>

                    {/* Price */}
                    <p className="text-green-600 font-semibold text-sm mt-1">
                      Rs {product.price}
                    </p>

                    {/* Stock */}
                    <p className="text-xs text-gray-500">
                      {product.stock > 0
                        ? `Stock: ${product.stock}`
                        : "Sold Out"}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-auto">
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
                );
              })}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}