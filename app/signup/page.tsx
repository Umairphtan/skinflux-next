"use client";

import { useState } from "react";
import { useAuth } from "@/context/authcontex";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function Signup() {
  const { signup } = useAuth();
  const router = useRouter(); 

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await signup(form);

      
      setForm({
        username: "",
        email: "",
        password: "",
      });

      alert("Signup successful");

      //edirect to login
      router.push("/login");

    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-5"
      >
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-pink-600">
            Create Account ✨
          </h2>
          <p className="text-sm text-gray-500">
            Join our skincare community
          </p>
        </div>

        {/* Username */}
        <div>
          <label className="text-sm text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-medium transition duration-300"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-pink-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}