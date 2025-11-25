'use client'
import { motion } from "framer-motion"
import Link from "next/link"

const CTA = () => {
  return (
    <section className="relative section-blue text-white py-20 overflow-hidden">

      {/* Soft Background Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-60 h-60 bg-white/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary-100/30 blur-3xl rounded-full"></div>
      </div>

      <div className="container-custom relative z-10 text-center">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Ready to Upgrade Your IT Infrastructure?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
        >
          Get expert consultation for networking, cloud, surveillance & enterprise security.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Link
            href="/contact"
            className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transition-all"
          >
            Talk to Expert
          </Link>

          <Link
            href="/products"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary-600 hover:scale-105 transition-all"
          >
            Browse Products
          </Link>
        </motion.div>

        {/* Contact Info */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/90">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">📞</div>
            <span className="font-semibold">+91 90235 06084</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">✉️</div>
            <span className="font-semibold">info@soltechnexus.com</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTA
