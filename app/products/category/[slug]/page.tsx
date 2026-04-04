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

  // 🔹 Search + Sor
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
      {/* 🔹 Modern Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-10 sm:py-14 mb-6">

        {/* Overlay Blur */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white capitalize tracking-wide">
            {slug} Products
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-white/80 mt-2">
            Discover best quality {slug} products
          </p>

          {/* 🔍 Search Bar */}
          <div className="mt-5 flex justify-center">
            <input
              type="text"
              placeholder={`Search in ${slug}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
          w-full max-w-xs sm:max-w-md
          h-10 sm:h-12
          px-5
          rounded-full
          border-none
          outline-none
          text-sm sm:text-base
          shadow-md
          bg-white/90
          placeholder-gray-500
          focus:ring-2 focus:ring-white
          transition
        "
            />
          </div>

        </div>

        {/* Decorative blur circle */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>

      </div>

      


      <div className="flex flex-col md:flex-row gap-4 px-3 sm:px-6 mt-6">


        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow h-fit">
          <h2 className="font-semibold mb-3">Filters</h2>

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
                    className="bg-white rounded-lg border shadow-sm hover:shadow-md transition p-2 flex flex-col"
                  >
                    {/* Image */}
                    <Link href={`/products/${product._id}`}>
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-28 sm:h-32 object-cover rounded-md"
                      />

                      {/* Title */}
                      <h2 className="text-xs sm:text-sm font-medium mt-2 line-clamp-1 text-gray-800">
                        {product.title}
                      </h2>
                    </Link>

                    {/* Price */}
                    <p className="text-green-600 font-semibold text-sm mt-1">
                      Rs {product.price}
                    </p>

                    {/* Stock */}
                    <p className="text-[11px] text-gray-500">
                      {product.stock > 0 ? `Stock: ${product.stock}` : "Sold Out"}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-1 mt-2">
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