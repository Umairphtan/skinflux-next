"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";
import BuyNowButton from "@/components/buynow";

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading products...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
               <div
  key={product._id}
  className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
  style={{ height: "450px" }} // ✅ Fixed height for all cards
>
  {/* Image + Title Clickable */}
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
    <h2 className="font-bold text-lg">{product.title}</h2>
  </Link>

  <p className="text-gray-600">{product.category}</p>
  <p className="text-green-600 font-semibold">${product.price}</p>

  {/* Stock */}
  {product.stock && product.stock > 0 ? (
    <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
  ) : (
    <p className="text-red-600 font-bold text-sm">Sold Out</p>
  )}

  {/* Description with fixed space */}
  <p
    className="text-gray-700 text-sm mt-2 flex-grow overflow-hidden"
    style={{
      display: "-webkit-box",
      WebkitLineClamp: 6, // ✅ Show only 6 lines, truncate rest
      WebkitBoxOrient: "vertical",
    }}
  >
    {product.description || "No description available"}
  </p>

  {/* Buttons at bottom */}
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
            ))}
        </div>
    );
}