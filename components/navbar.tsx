"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact Us", href: "/contact" },
  { name: "Policy", href: "/policy" }
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname() // active link highlight

  return (
    <header className="w-full border-b bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="text-3xl font-bold text-pink-600">
            SkinFlux
          </Link>

          {/* DESKTOP LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition duration-200 ${
                  pathname === link.href
                    ? "text-pink-600 font-semibold"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/login" className="flex items-center gap-2 hover:text-pink-600">
              <User size={28} />
              Login
            </Link>

            <Link href="/cart" className="relative hover:text-pink-600">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 text-xs bg-pink-600 text-white px-1.5 rounded-full">
                0
              </span>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 bg-white">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`${
                pathname === link.href
                  ? "text-pink-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/login" onClick={() => setMobileOpen(false)}>
            Login
          </Link>

          <Link href="/cart" onClick={() => setMobileOpen(false)}>
            Cart
          </Link>
        </div>
      </div>
    </header>
  )
}