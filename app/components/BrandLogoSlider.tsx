"use client";
import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image"; // ✅ Add this

// ▶️ Brand Interface
interface Brand {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

interface LogoItemProps {
  brand: Brand;
  index: number;
}

interface InfiniteSliderRowProps {
  brands: Brand[];
  direction: "left" | "right";
  speed: number;
  isInView: boolean;
}

// ▶️ Partner Logos (split into 2 rows)
const row1Brands: Brand[] = [
  {
    name: "AWS",
    logo: "/logo/aws-171.webp",
    width: 100,
    height: 60,
  },
  {
    name: "Dell",
    logo: "/logo/dell.webp",
    width: 80,
    height: 60,
  },
  {
    name: "Cisco",
    logo: "/logo/Cisco-logo.webp",
    width: 100,
    height: 60,
  },
  {
    name: "Microsoft",
    logo: "/logo/Microsoft.webp",
    width: 120,
    height: 60,
  },
];

const row2Brands: Brand[] = [
  {
    name: "Azure",
    logo: "/logo/Azure.webp",
    width: 100,
    height: 60,
  },
  {
    name: "BenQ",
    logo: "/logo/benq.webp", // ✅ Use local optimized images
    width: 80,
    height: 60,
  },
  {
    name: "Panasonic",
    logo: "/logo/panasonic.webp",
    width: 120,
    height: 60,
  },
  {
    name: "PeopleLink",
    logo: "/logo/peoplelink.webp", // ✅ Use local optimized images
    width: 100,
    height: 60,
  },
];

// ▶️ Logo Component
const LogoItem = memo(({ brand, index }: LogoItemProps) => (
  <div className="flex-shrink-0 mx-6 group">
    <div className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-xl group-hover:scale-105">
      {/* ✅ Use Next.js Image with proper dimensions */}
      <div className="h-20 w-24 relative flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={brand.width || 100}
          height={brand.height || 60}
          className="object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </div>
));

LogoItem.displayName = "LogoItem";

// ▶️ Infinite Slider Row
const InfiniteSliderRow = memo(
  ({ brands, direction, speed, isInView }: InfiniteSliderRowProps) => {
    const repeated = [...brands, ...brands, ...brands];

    return (
      <div 
        className="overflow-hidden py-6"
        role="region"
        aria-label={`Partner logos scrolling ${direction}`}
      >
        <div
          className={`flex items-center ${
            isInView
              ? direction === "left"
                ? "animate-scroll-left"
                : "animate-scroll-right"
              : "pause-animation"
          }`}
          style={{
            animationDuration: `${speed}s`,
            ["--mobile-speed" as string]: `${speed * 0.5}s`,
          }}
        >
          {repeated.map((brand, index) => (
            <LogoItem
              key={`${brand.name}-${index}`}
              brand={brand}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }
);

InfiniteSliderRow.displayName = "InfiniteSliderRow";

// ▶️ MAIN COMPONENT
const BrandLogoSlider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section className="bg-gray-50 py-20" aria-labelledby="partners-heading">
      <div className="container-custom">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="badge mb-6">
            <div className="w-2 h-2 bg-primary-700 rounded-full animate-pulse" aria-hidden="true"></div>
            <span>Our Partners</span>
          </div>

          <h2 id="partners-heading" className="text-4xl font-bold mb-4">
            Technology Leaders We Work With
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our trusted partners power our technology ecosystem.
          </p>
        </motion.div>

        {/* Infinite Sliders - Row 1 & Row 2 */}
        <div ref={ref}>
          <InfiniteSliderRow
            brands={row1Brands}
            direction="left"
            speed={30}
            isInView={isInView}
          />

          <InfiniteSliderRow
            brands={row2Brands}
            direction="right"
            speed={40}
            isInView={isInView}
          />
        </div>

        {/* Animations */}
        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          
          .animate-scroll-left { 
            animation: scroll-left linear infinite; 
          }
          .animate-scroll-right { 
            animation: scroll-right linear infinite; 
          }
          .pause-animation { 
            animation-play-state: paused !important; 
          }

          @media (max-width: 1023px) {
            .animate-scroll-left,
            .animate-scroll-right {
              animation-duration: var(--mobile-speed) !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-scroll-left,
            .animate-scroll-right {
              animation: none !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default memo(BrandLogoSlider);