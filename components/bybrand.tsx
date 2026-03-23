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
  { name: "Brand A", logo: "/brands/brand-a.png", href: "/products/category/brand-a" },
  { name: "Brand B", logo: "/brands/brand-b.png", href: "/products/brand/brand-b" },
  { name: "Brand C", logo: "/brands/brand-c.png", href: "/products/brand/brand-c" },
  { name: "Brand D", logo: "/brands/brand-d.png", href: "/products/brand/brand-d" },
  { name: "Brand E", logo: "/brands/brand-e.png", href: "/products/brand/brand-e" },
];

export default function ShopByBrand() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
        Shop by Brand
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {brands.map((brand, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center cursor-pointer transition h-[180px] max-w-[180px] mx-auto"
          >
            <Link href={brand.href}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-full w-auto object-contain"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}