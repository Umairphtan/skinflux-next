"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SaleBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-100 via-white to-pink-50 py-16 px-6 rounded-3xl shadow-lg">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-300 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-400 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10 relative z-10">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1 text-sm bg-pink-500 text-white rounded-full mb-4">
            Limited Time Offer
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Flat <span className="text-pink-600">50% OFF</span> <br />
            On Skincare Essentials
          </h2>

          <p className="text-gray-600 mb-6">
            Glow naturally with our premium skincare products. 
            Limited stock available — grab your favorites now!
          </p>

          <div className="flex gap-4">
            <Link href="/products">
              <button className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition font-semibold shadow-md">
                Shop Now
              </button>
            </Link>

            <Link href="/produtcs">
              <button className="px-6 py-3 border border-pink-500 text-pink-500 rounded-xl hover:bg-pink-50 transition font-semibold">
                Explore More
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
        

          {/* Discount Badge */}
          <div className="absolute top-5 right-5 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
            -50%
          </div>
        </motion.div>

      </div>
    </section>
  );
}