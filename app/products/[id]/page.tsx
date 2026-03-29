"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";
import BuyNowButton from "@/components/buynow";

export default function ProductPage() {
  const { id } = useParams() as { id?: string };
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err: any) {
        console.error("Product Error:", err);
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 mt-20">Loading...</div>;
  if (error) return <div className="p-6 mt-20 text-red-500">{error}</div>;
  if (!product) return <div className="p-6 mt-20">Product not found</div>;

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
    : "/default.jpg";

  return (
    <div className="p-6 mt-20 max-w-5xl mx-auto flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-lg">
      {/* Product Image */}
      <div className="md:w-1/2">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 mt-1">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-xl font-semibold mt-4">Rs {product.price}</p>
          <p className={`mt-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </p>

          <div className="max-w-md mx-auto mt-6 p-4 border rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{product.title || "Product Title"}</h2>
            <div
              className="text-gray-700 breakwords"
              style={{
                whiteSpace: "pre-line",     // newline کو preserve کرے
                overflowWrap: "anywhere",   // لمبی words wrap ہو جائیں
                overflow: "hidden",          // scrollbars نہیں آئیں
              }}
            >
              {product.description || "No description available"}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <AddToCartButton productId={product._id} stock={product.stock} />
          <BuyNowButton productId={product._id} price={product.price} />
        </div>

        {/* Go Back */}
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-1/2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}