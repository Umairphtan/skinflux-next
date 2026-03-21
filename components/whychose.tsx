// components/WhyChooseUs.tsx
"use client";
import React from "react"; 
import { ShieldCheck, Leaf, Truck, Star } from "lucide-react";
import { motion } from "framer-motion";

type Feature = {
icon: React.ReactNode;   title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Leaf className="w-10 h-10 text-pink-500" />,
    title: "Natural Ingredients",
    description: "We use only pure and natural ingredients for all our skin products.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-pink-500" />,
    title: "Safe & Tested",
    description: "All our products are dermatologically tested for safety and effectiveness.",
  },
  {
    icon: <Truck className="w-10 h-10 text-pink-500" />,
    title: "Fast Delivery",
    description: "Get your products delivered quickly at your doorstep with reliable shipping.",
  },
  {
    icon: <Star className="w-10 h-10 text-pink-500" />,
    title: "High Quality",
    description: "Premium quality products to give your skin the care it deserves.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center text-pink-600 mb-12"
      >
        Why Choose Us
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: "0 15px 25px rgba(0,0,0,0.15)" }}
            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer"
          >
            {feature.icon}
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}