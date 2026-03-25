// components/ShopByBrand.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Brand = {
  name: string;
  logo: string; // image path ya URL
  href: string; // brand filter page
};

// Sample brands
const brands: Brand[] = [
  { name: "Cerave", logo: "/cerave.webp", href: "/products/category/brand-a" },
  { name: "La Roche-Posay", logo: "/la.jpg", href: "/products/brand/brand-b" },
  { name: "Medicube", logo: "/medicube.webp", href: "/products/brand/brand-c" },
  { name: "Gluvit", logo: "/gluvit.webp", href: "/products/brand/brand-d" },
  { name: "The Ordinary", logo: "/ordinary.webp", href: "/products/brand/brand-e" },
];

export default function ShopByBrand() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center text-pink-600 mb-16">
        Shop by Brand
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        {brands.map((brand, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer transition duration-300 hover:shadow-2xl"
          >
            <Link href={brand.href} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="object-contain h-full w-full"
                />
              </div>
              <span className="text-lg font-semibold text-gray-700 text-center">
                {brand.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}