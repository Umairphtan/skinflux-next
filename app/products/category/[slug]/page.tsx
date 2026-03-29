"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryProducts } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";
import BuyNowButton from "@/components/buynow";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { slug } = useParams() as { slug?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<string[]>([]); // for Read More

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getCategoryProducts(slug);
        setProducts(data);
      } catch (err) {
        console.error("Category Error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (loading)
    return (
      <div className="p-6 mt-20 text-center text-gray-600 font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold capitalize mb-8 text-gray-800">
        {slug} Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center mt-20 text-lg">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
          {products.map((product, index) => {
            const imageUrl = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
              : "/default.jpg";

            const isExpanded = expandedIds.includes(product._id);

            return (
              <motion.div
                key={product._id}
                className="bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col"
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={`/products/${product._id}`}
                  className="cursor-pointer flex-shrink-0"
                >
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="h-56 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 truncate">
                      {product.title}
                    </h2>
                    <p className="text-pink-600 font-bold text-md mt-1">
                      Rs {product.price}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Stock: {product.stock || 0}
                    </p>

                    {/* Description with Read More */}
                    {product.description && (
                      <p className="text-gray-600 text-sm mt-2">
                        {isExpanded
                          ? product.description
                          : product.description.length > 60
                          ? product.description.slice(0, 60) + "..."
                          : product.description}
                        {product.description.length > 60 && (
                          <button
                            className="text-pink-600 font-medium ml-1"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleExpand(product._id);
                            }}
                          >
                            {isExpanded ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Buttons */}
                <div className="p-4 mt-auto flex gap-2">
                  <AddToCartButton
                    productId={product._id}
                    stock={product.stock || 0}
                  />
                  <BuyNowButton
                    productId={product._id}
                    price={product.price || 0}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}