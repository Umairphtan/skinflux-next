"use client";

import { useState } from "react";
import { signupUser } from "@/services/user";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); //
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signupUser(form);

      login(res.user, res.token); //

      alert("Signup Successful ");
      router.push("/"); // redirect to home
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff0f5] to-[#ffe6f0]">
      <motion.div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#d63384] mb-6">
          Create New Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            placeholder="Username"
            value={form.username}
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-pink-400 text-white font-semibold text-lg"
          >
            {loading ? "Creating..." : "Sign Up"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}