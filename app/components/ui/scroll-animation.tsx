"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { ElementType, useEffect, useRef } from "react";

type ScrollAnimationProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
};

export function ScrollAnimation({
  children,
  className,
  delay = 0.2,
  duration = 0.5,
  as = "div",
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const MotionComponent = motion(as);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <MotionComponent
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
