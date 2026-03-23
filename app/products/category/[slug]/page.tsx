"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategoryProducts } from "@/services/product";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/addtocartbtn";

export default function CategoryPage() {
  const { slug } = useParams() as { slug?: string };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-6 mt-20">Loading...</div>;

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug} Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageUrl = product.image
              ? product.image.startsWith("http")
                ? product.image
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.image}`
              : "/default.jpg";

            return (
              <div
                key={product._id}
                className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col"
              >
                <Link href={`/products/${product._id}`} className="cursor-pointer">
                  <img
                    src={imageUrl}
                    alt={product.title}
                    className="h-48 w-full object-cover rounded"
                  />
                  <h2 className="font-semibold mt-2">{product.title}</h2>
                  <p className="text-gray-700 mt-1">Rs {product.price}</p>
                </Link>

                {/* Add to Cart Button */}
                <AddToCartButton
                  productId={product._id}
                  stock={product.stock || 0}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}