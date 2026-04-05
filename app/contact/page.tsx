"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/services/contact";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await submitContact(form);

      setSuccess(res.message);
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="bg-pink-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 py-16 md:py-24 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">
              Contact Us
            </h1>
            <p className="text-gray-700 mb-6">
              Have questions or need assistance? Reach out to us and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <img
              src="/contact.jpg"
              alt="Contact Banner"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Get in Touch
            </h2>

            {success && (
              <p className="mb-4 text-green-600 font-semibold">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300"
              />

              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pink-300"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Contact Info
            </h2>

            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-pink-500" />
              <span>Skinflux ferozpur samnabad lahore pakistan</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-pink-500" />
              <span>skinflux@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-pink-500" />
              <span>+92 326-0611728</span>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}