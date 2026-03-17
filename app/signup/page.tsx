"use client";

import { useState } from "react";
import { signupUser } from "@/services/user";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupUser(form);
      alert(res.message);
      setForm({ username: "", email: "", password: "" });
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff0f5] to-[#ffe6f0]">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-[#d63384] mb-6">
          Create New Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-pink-400 text-white font-semibold text-lg shadow-md hover:bg-pink-500 transition"
          >
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-pink-400 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}