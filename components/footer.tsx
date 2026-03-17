"use client"

import Link from "next/link"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* BRAND INFO */}
        <div>
          <h2 className="text-2xl font-bold text-pink-500 mb-4">SkinGlow</h2>
          <p className="text-gray-400">
            Premium skincare products to nourish your skin and bring the glow back.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-pink-500 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-pink-500 transition">Products</Link></li>
            <li><Link href="/contact" className="hover:text-pink-500 transition">Contact Us</Link></li>
            <li><Link href="/policy" className="hover:text-pink-500 transition">Policy</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>📞 +92 300 000 0000</li>
            <li>✉️ support@skinglow.com</li>
            <li>🏢 123 Skincare Street, Karachi, Pakistan</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-pink-500 transition-transform transform hover:scale-125"><Instagram size={24} /></Link>
            <Link href="#" className="hover:text-pink-500 transition-transform transform hover:scale-125"><Facebook size={24} /></Link>
            <Link href="#" className="hover:text-pink-500 transition-transform transform hover:scale-125"><Twitter size={24} /></Link>
            <Link href="#" className="hover:text-pink-500 transition-transform transform hover:scale-125"><Youtube size={24} /></Link>
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SkinGlow. All rights reserved.
      </div>
    </footer>
  )
}