"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
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

          {/* Right side - Banner Image */}
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

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-pink-600 mb-6">
              Get in Touch
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
              />
              <textarea
                placeholder="Message"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                rows={5}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
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