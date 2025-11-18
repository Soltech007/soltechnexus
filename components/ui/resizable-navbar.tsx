"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useState } from "react";

/* ===================== TYPE DEFINITIONS ===================== */

export interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

export interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  scrolled?: boolean;
}

export interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

export interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  scrolled?: boolean;
}

export interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}

type ButtonVariant = "primary" | "secondary";

/* ===================== NAVBAR WRAPPER ===================== */

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;

    // ➤ First load: Force no animation, no shrink
    if (firstLoad) {
      setScrolled(false);
      setFirstLoad(false);
      return;
    }

    // ➤ Shrink after any scrolling
    setScrolled(latest > 20);

    // ➤ Hide on scroll down, show on scroll up
    if (latest > prev && latest > 150) setHidden(true);
    else setHidden(false);
  });

  return (
    <motion.div
      initial={false}                        // ⭐ NO first load animation
      animate={hidden ? { y: "-120%" } : { y: 0 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] backdrop-blur-sm pointer-events-auto",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { scrolled })
          : child
      )}
    </motion.div>
  );
};

/* ===================== DESKTOP NAV BODY ===================== */


export const NavBody = ({ children, scrolled }: NavBodyProps) => {
  const childArr = React.Children.toArray(children);
  const logo = childArr[0];
  const items = childArr[1];
  const button = childArr[2];

  return (
    <div className="w-full flex justify-center">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? "68%" : "100%",
          maxWidth: scrolled ? "1100px" : "1600px",
          borderRadius: scrolled ? "36px" : "0px",
          paddingTop: scrolled ? "10px" : "20px",
          paddingBottom: scrolled ? "10px" : "20px",
        }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
        className="
          hidden lg:flex items-center justify-between px-8 shadow-lg 
          bg-primary-gradient text-primary-foreground
        "
      >
        {logo}
        {items}
        {button}
      </motion.div>
    </div>
  );
};
/* ===================== NAV ITEMS ===================== */

export const NavItems = ({ items, onItemClick, className }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center gap-1 mx-4", className)}>
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative px-4 py-2 text-white font-semibold uppercase tracking-wide text-sm"
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover"
              className="absolute inset-0 bg-white/20 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

/* ===================== MOBILE NAV ===================== */

export const MobileNav = ({ children, scrolled }: MobileNavProps) => (
  <motion.div
    initial={false}
    animate={{
      paddingTop: scrolled ? "8px" : "4px",
      paddingBottom: scrolled ? "8px" : "4px",
    }}
    className="lg:hidden w-full"
  >
    <motion.div
      initial={false}
      animate={{ borderRadius: scrolled ? "18px" : "0px" }}
      className="flex w-full items-center justify-between bg-primary-gradient px-4 py-3 shadow-md"
    >
      {children}
    </motion.div>
  </motion.div>
);

export const MobileNavHeader = ({ children }: MobileNavHeaderProps) => (
  <div className="flex items-center justify-between w-full">{children}</div>
);

export const MobileNavMenu = ({ children, isOpen, className }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className={cn("overflow-hidden w-full mt-2", className)}
      >
        <div className="flex flex-col gap-2 pt-4 pb-2 border-t border-white/20">{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ===================== MOBILE TOGGLE & LOGO ===================== */

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button onClick={onClick} className="p-2 rounded-lg hover:bg-white/10">
    {isOpen ? <IconX className="text-white w-6 h-6" /> : <IconMenu2 className="text-white w-6 h-6" />}
  </button>
);

export const NavbarLogo = () => (
  <a href="/" className="flex items-center group">
    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
      <span className="text-primary-600 font-black text-xl">SN</span>
    </div>
  </a>
);

/* ===================== FIXED BUTTON WITH TYPE ===================== */

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
}) => {
  const styles: Record<ButtonVariant, string> = {
    primary:
      "bg-white text-primary-600 px-5 py-2 rounded-full font-semibold shadow-md hover:scale-[1.03]",
    secondary:
      "bg-transparent text-white border-2 border-white px-5 py-2 rounded-full",
  };

  return (
    <a href={href} className={cn(styles[variant], className)}>
      {children}
    </a>
  );
};
