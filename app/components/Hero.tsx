'use client'
import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
  import { Award, ShieldCheck, Cloud } from "lucide-react";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const slides = [
    {
      id: 2,
      image: "/hero.jpg",
      title: "CCTV & Surveillance",
      highlight: "Security Systems",
      subtitle: "Advanced monitoring solutions with PeopleLink, BenQ, and Panasonic for complete security coverage",
      buttonText: "View Solutions",
      buttonLink: "/products",
      badge: "24/7 MONITORING",
    },
      {
      id: 1,
      image: "/hero1.jpg",
      title: "IT Infrastructure",
      highlight: "Solutions",
      subtitle: "Transforming businesses with cutting-edge networking, cloud services, and cybersecurity solutions",
      buttonText: "Explore Services",
      buttonLink: "/services",
      badge: "TRUSTED BY 200+ CLIENTS",
    },
    {
      id: 3,
      image: "/hero3.jpg",
      title: "Cloud Migration",
      highlight: "AWS | Azure | Microsoft 365",
      subtitle: "Seamless cloud transformation with enterprise-grade security and scalability",
      buttonText: "Get Started",
      buttonLink: "/services",
      badge: "CERTIFIED PARTNERS",
    },
    {
      id: 4,
      image: "/hero4.jpg",
      title: "Network Security",
      highlight: "& Cybersecurity",
      subtitle: "Dell & Cisco powered firewalls, routers, and security appliances for enterprise protection",
      buttonText: "Secure Now",
      buttonLink: "/contact",
      badge: "ENTERPRISE GRADE",
    },
    {
      id: 5,
      image: "/hero5.jpg",
      title: "IT Consultancy",
      highlight: "& Support",
      subtitle: "Expert guidance, AMC services, and 24/7 technical support for seamless operations",
      buttonText: "Learn More",
      buttonLink: "/about",
      badge: "15+ YEARS EXPERIENCE",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [isAutoPlay, nextSlide])

  return (
   <section
  className="relative w-full h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-24 "
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Zoom */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "linear" }}
          >
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority={currentSlide === 0}
              quality={90}
            />
          </motion.div>

          {/* Multi-layer Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-900/10" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl space-y-6 lg:space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary-light to-blue-400 text-white px-5 py-2.5 rounded-full text-xs md:text-sm font-black tracking-wider shadow-2xl uppercase">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    {slides[currentSlide].badge}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <h1 className="text-white leading-[1.1]">
                    <motion.span 
                      className="block text-4xl sm:text-5xl lg:text-7xl font-black mb-3 drop-shadow-2xl"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {slides[currentSlide].title}
                    </motion.span>
                    <motion.span 
                      className="block text-2xl sm:text-3xl lg:text-5xl font-light"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                        {slides[currentSlide].highlight}
                      </span>
                    </motion.span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="text-gray-200 text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed drop-shadow-lg"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <Link
                    href={slides[currentSlide].buttonLink}
                    className="group relative bg-white text-black px-8 py-4 rounded-full text-base lg:text-lg font-bold  transition-all duration-500 shadow-2xl flex items-center justify-center gap-3 overflow-hidden hover:scale-105"
                  >
                    <span className="relative z-10">{slides[currentSlide].buttonText}</span>
                    <motion.span 
                      className="relative z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>

                  <Link
                    href="/contact"
                    className="group border-2 border-white text-white px-8 py-4 rounded-full text-base lg:text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 text-center backdrop-blur-md hover:scale-105 shadow-xl"
                  >
                    Contact Our Experts
                  </Link>
                </motion.div>

                {/* Features */}
            

<motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 1, duration: 0.8 }}
  className="flex flex-wrap gap-4 pt-2"
>
  {[
    { icon: <Award className="w-5 h-5 text-primary-300" />, text: "Dell Certified" },
    { icon: <ShieldCheck className="w-5 h-5 text-primary-300" />, text: "Cisco Partner" },
    { icon: <Cloud className="w-5 h-5 text-primary-300" />, text: "Microsoft Partner" },
  ].map((feature, index) => (
    <motion.div
      key={index}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.1 + index * 0.15, type: "spring", stiffness: 120 }}
      className="
        flex items-center gap-2 
        bg-white/10 backdrop-blur-xl 
        px-5 py-2.5 
        rounded-2xl 
        border border-white/20 
        shadow-[0_2px_10px_rgba(255,255,255,0.12)]
        hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)]
        hover:bg-white/20 
        hover:border-white/40 
        hover:scale-110 
        transition-all duration-300 
        cursor-default
      "
    >
      <span className="text-xl drop-shadow">
        {feature.icon}
      </span>

      <span className="text-white/95 text-sm md:text-base font-semibold tracking-wide">
        {feature.text}
      </span>
    </motion.div>
  ))}
</motion.div>

              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {/* <div className="hidden md:block">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center text-2xl font-bold z-20 shadow-xl"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center text-2xl font-bold z-20 shadow-xl"
        >
          →
        </motion.button>
      </div> */}

      {/* Indicators */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.3 }}
            className={`transition-all duration-500 rounded-full ${
              currentSlide === index
                ? 'w-12 lg:w-16 h-2.5 bg-white shadow-lg shadow-white/50'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 overflow-hidden z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary-light shadow-lg"
          initial={{ width: "0%" }}
          animate={{ width: isAutoPlay ? "100%" : "0%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={`progress-${currentSlide}`}
        />
      </div>

      {/* Slide Counter */}
      {/* <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden lg:flex absolute top-8 right-8 items-center gap-3 text-white/90 text-sm font-bold backdrop-blur-lg bg-white/10 px-5 py-3 rounded-full border border-white/20 shadow-xl"
      >
        <span className="text-2xl font-black text-primary-light">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-white/60">/</span>
        <span className="text-white/80">{String(slides.length).padStart(2, '0')}</span>
      </motion.div> */}
    </section>
  )
}

export default HeroSlider