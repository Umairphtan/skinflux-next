"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const slides = [
  {
    id: 1,
    title: "Glow Naturally",
    subtitle: "Organic skincare for radiant skin",
    image: "/skin3.jpeg"
  },
  {
    id: 2,
    title: "Healthy Skin",
    subtitle: "Feel fresh, look beautiful",
    image: "/skin2.webp"
  },
  {
    id: 3,
    title: "Pure Beauty",
    subtitle: "No chemicals, only nature",
    image: "/skin1.jpg"
  }
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] overflow-hidden mt-4">

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute w-full h-full"
        >
          {/* IMAGE */}
          <Image
            src={slides[index].image}
            alt="banner"
            fill
            priority
            className="object-cover"
          />

          {/* GRADIENT OVERLAY (better than black) */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center">
            <div className="px-5 sm:px-10 md:px-20 text-white max-w-xl">

              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 leading-tight"
              >
                {slides[index].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-lg md:text-xl mb-5"
              >
                {slides[index].subtitle}
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-pink-600 hover:bg-pink-700 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg "
              >
                Shop Now
              </motion.button>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DOTS */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
              index === i ? "bg-pink-600" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  )
}