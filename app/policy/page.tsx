"use client";

import { motion } from "framer-motion";

const policies = [
  {
    title: "Privacy Policy",
    description:
      "Your privacy is important to us. We never share your personal information with third parties."
  },
  {
    title: "Refund Policy",
    description:
      "If you are not satisfied with a product, you can request a refund within 30 days of purchase."
  },
  {
    title: "Shipping Policy",
    description:
      "We deliver products worldwide with fast and reliable shipping options."
  },
  {
    title: "Terms & Conditions",
    description:
      "By using our website, you agree to our terms and conditions for safe and fair usage."
  }
];

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-pink-50 rounded-xl shadow-lg p-12 mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
            Our Policies
          </h1>
          <p className="text-gray-700 text-lg">
            Read our policies to know how we protect your data and provide a safe shopping experience.
          </p>
        </motion.div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transform transition"
            >
              <h3 className="text-xl font-semibold text-pink-600 mb-2">{policy.title}</h3>
              <p className="text-gray-600">{policy.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}