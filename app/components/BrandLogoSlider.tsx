"use client";
import { useRef, memo } from "react";
import { motion, useInView } from "framer-motion";
import Head from "next/head";

// ▶️ Brand Interface
interface Brand {
  name: string;
  logo: string;
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
  {
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  },
  {
    name: "Cisco",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/64/Cisco_logo.svg",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
];

const row2Brands: Brand[] = [
  {
    name: "Azure",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg",
  },
  {
    name: "BenQ",
    logo: "https://imgs.search.brave.com/QCn6jhDjlNqWz922KHlO9f_hu4izcvysLgDAnR0W5J4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzI2NzU5LnBuZw",
  },
  {
    name: "Panasonic",
    logo: "https://imgs.search.brave.com/q_PlWsfrFfeT1DsdYxMZCEx-D4i6jWttQeun3N8RL5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy84/LzhlL1BhbmFzb25p/Y19sb2dvXyhCbHVl/KS5zdmc",
  },
  { name: "PeopleLink", logo: "https://imgs.search.brave.com/e-wP27IenMebiVnrmobCzNepGdCy7Xd7BZlB8CN5j5A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuemFwbml0by5j/b20vY2RuLWNnaS9p/bWFnZS9tZXRhZGF0/YT1jb3B5cmlnaHQs/Zm9ybWF0PWF1dG8s/cXVhbGl0eT05NSxm/aXQ9c2NhbGUtZG93/bi9odHRwczovL2lt/YWdlcy56YXBuaXRv/LmNvbS91c2Vycy81/OTcxMzIvYXZhdGFy/L2xhcmdlX3FXT0lK/S3FJUXVhOHdXTkVI/WFJ1X3Blb3BsZS1s/aW5rLXVuaWZpZWQt/Y29tbXVuaWNhdGlv/bnMtc3F1YXJlbG9n/by0xNTY3MDc1NTkw/MzQ3LnBuZw" },
];


// ▶️ Logo Component (removed float animation)
const LogoItem = memo(({ brand, index }: LogoItemProps) => (
  <div className="flex-shrink-0 mx-6 group">
    <div className="bg-white px-8 py-6 rounded-xl shadow-sm border border-gray-200 transition-all group-hover:shadow-xl group-hover:scale-105">
      <img src={brand.logo} alt={brand.name} className="h-20 object-contain" />
    </div>
  </div>
));

LogoItem.displayName = "LogoItem";

// ▶️ Infinite Slider Row
const InfiniteSliderRow = memo(
  ({ brands, direction, speed, isInView }: InfiniteSliderRowProps) => {
    const repeated = [...brands, ...brands, ...brands];

    return (
      <div className="overflow-hidden py-6">
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
            ['--mobile-speed' as string]: `${speed * 0.5}s`
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
    <>
      <Head>
        <title>Our Partners | Infinity Slider</title>
      </Head>

      <section className="bg-gray-50 py-20">
        <div className="container-custom">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
           <div className="badge mb-6">
              <div className="w-2 h-2 bg-primary-700 rounded-full animate-pulse"></div>
                 <span>Our Partner</span>
            </div>

            <h2 className="text-4xl font-bold mb-4">
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

            /* Mobile: Faster speed */
            @media (max-width: 1023px) {
              .animate-scroll-left,
              .animate-scroll-right {
                animation-duration: var(--mobile-speed) !important;
              }
            }
          `}</style>
        </div>
      </section>
    </>
  );
};

export default memo(BrandLogoSlider);