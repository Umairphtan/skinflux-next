// components/FeatureCategories.tsx
"use client";

import Link from "next/link";

const featureCategories = [
  { title: "SHAMPOO", image: "/skin1.jpg" },
  { title: "HAIR_CARE", image: "/skin1.jpg" },
  { title: "SERUM", image: "/images/categories/serum.jpg" },
  { title: "FACEWASH", image: "/images/categories/facewash.jpg" },
  { title: "OIL", image: "/images/categories/oil.jpg" },
  { title: "SUPPLEMENTS", image: "/images/categories/supplement.jpg" },
  { title: "CREAM", image: "/images/categories/cream.jpg" },
  { title: "ACNE_CARE", image: "/images/categories/cream.jpg" },
  { title: "WHITENING", image: "/images/categories/cream.jpg" },
  { title: "SUNBLOCK", image: "/images/categories/cream.jpg" },
  { title: "SENSITIVE_SKIN", image: "/images/categories/cream.jpg" },
  { title: "WEIGHT_LOSE", image: "/images/categories/cream.jpg" },
];

export default function FeatureCategories() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {featureCategories.map((cat) => (
          <Link
            key={cat.title}
            href={`/products/category/${cat.title.toLowerCase()}`}
            className="group"
          >
            <div className="cursor-pointer bg-white rounded-2xl p-4 flex flex-col items-center justify-center 
                            hover:shadow-xl transition-shadow duration-300">
              {cat.image && (
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 text-center group-hover:text-pink-600 transition-colors duration-300">
                {cat.title.replace("_", " ")}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}