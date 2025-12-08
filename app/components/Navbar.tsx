'use client';

import { useState, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- TYPE DEFINITION & DATA ---
type NavLink = {
  href?: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    href: string;
    label: string;
  }[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Products",
    href: "/products",
    hasDropdown: true,
    dropdownItems: [
      { href: "/products", label: "All Products" },
      { href: "/products/cctv-surveillance", label: "CCTV & Surveillance" },
      { href: "/products/networking-devices", label: "Networking Devices" },
      { href: "/products/servers-storage", label: "Servers & Storage" },
      { href: "/products/firewalls-security", label: "Firewalls & Security" },
      { href: "/products/collaboration-tools", label: "Collaboration Tools" },
      { href: "/products/cybersecurity-software", label: "Cybersecurity Software" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      { href: "/services", label: "All Services" },
      { href: "/services/it-consulting", label: "IT Consulting" },
      { href: "/services/enterprise-networking", label: "Enterprise Networking" },
      { href: "/services/cloud-migration", label: "Cloud Services & Migration" },
      { href: "/services/cybersecurity", label: "Cybersecurity Solutions" },
      // { href: "/services/hardware-installation", label: "Hardware Installation" },
      { href: "/services/amc-support", label: "AMC & Technical Support" },
    ],
  },
  // {
  //   label: "Industries",
  //   href: "/industries",
  //   hasDropdown: true,
  //   dropdownItems: [
  //     { href: "/industries", label: "All Industries" },
  //     { href: "/industries/corporates", label: "Corporates" },
  //     { href: "/industries/education", label: "Education" },
  //     { href: "/industries/government", label: "Government" },
  //     { href: "/industries/data-centers", label: "Data Centers" },
  //     { href: "/industries/healthcare", label: "Healthcare" },
  //     { href: "/industries/sme", label: "SMEs" },
  //   ],
  // },
  { href: "/contact", label: "Contact" },
];

// --- HELPER COMPONENT (MOBILE) ---
const DisclosureComponent = ({ link, onLinkClick }: { link: NavLink, onLinkClick: () => void }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold nav-link-mobile"
      >
        <span className="p-base">{link.label}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isSubmenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-6"
          >
            <div className="py-2 space-y-1">
              {link.dropdownItems?.map((item) => (
                <Link key={item.href} href={item.href} onClick={onLinkClick} className="block px-4 py-2 rounded-lg nav-sublink-mobile">
                  <span className="p-small">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export function NavbarDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'py-2' : 'py-2'}`}>
        <div
          className={`mx-auto transition-all duration-300 ease-in-out ${scrolled ? 'header-bg-scrolled shadow-md h-[59px]' : 'header-bg'}`}
          style={{
            maxWidth: scrolled ? '1280px' : '100%',
            borderRadius: scrolled ? '1rem' : '0',
          }}
        >
          <div className="flex items-center justify-between h-14 container-custom">
            {/* ✅ Use Next.js Image component */}
            <Link 
              href="/" 
              className="flex items-center gap-2 font-bold flex-shrink-0"
              aria-label="Soltech Nexus - Go to homepage"
            >
              <div className="h-20 w-[120px] overflow-hidden flex items-center justify-center relative">
                <Image
                  src="/logoo.webp" 
                  alt="Soltech Nexus Logo"
                  width={120}
                  height={80}
                  priority // ✅ Preload logo for LCP
                  className="object-contain"
                />
              </div>
            </Link>

            {/* ✅ Add aria-label to nav */}
            <nav 
              className="hidden lg:flex items-center font-medium gap-2"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => link.hasDropdown && setActiveDropdown(null)}
                >
                  <Link 
                    href={link.href || "#"} 
                    className="nav-link flex items-center gap-1.5 px-4 min-h-[44px]" // ✅ Add min-height for touch target
                    aria-expanded={link.hasDropdown ? activeDropdown === link.label : undefined}
                    aria-haspopup={link.hasDropdown ? "menu" : undefined}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.label ? "rotate-180" : ""}`} 
                        aria-hidden="true"
                      />
                    )}
                    {!link.hasDropdown && <span className="nav-link-underline" />}
                  </Link>
                  
                  {link.hasDropdown && (
                    <div 
                      className={`nav-dropdown absolute top-full left-1/2 -translate-x-1/2 w-60 transition-all duration-300 origin-top ${activeDropdown === link.label ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                      role="menu"
                      aria-label={`${link.label} submenu`}
                    >
                      <div className="py-2">
                        {link.dropdownItems?.map((item) => (
                          <Link 
                            key={item.href} 
                            href={item.href} 
                            className="nav-dropdown-item min-h-[44px] flex items-center" // ✅ Add min-height
                            onClick={() => setActiveDropdown(null)}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link 
                href="/contact" 
                className="btn-primary px-5 py-2.5 min-h-[44px] flex items-center" // ✅ Add min-height
              >
                Get Started
              </Link>
            </div>

            {/* ✅ Improved mobile menu button */}
            <button 
              type="button" 
              onClick={toggleMenu} 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 min-h-[44px] min-w-[44px] flex items-center justify-center" 
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-6 h-6 relative">
                <Menu 
                  className={`absolute transition-all duration-300 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`} 
                  aria-hidden="true"
                />
                <X 
                  className={`absolute transition-all duration-300 ${isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`} 
                  aria-hidden="true"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl p-6 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="h5">Menu</h3>
                <button 
                  onClick={toggleMenu} 
                  className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto py-6 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.hasDropdown ? (
                      <DisclosureComponent link={link} onLinkClick={toggleMenu} />
                    ) : (
                      <Link 
                        href={link.href!} 
                        onClick={toggleMenu} 
                        className="block w-full px-4 py-3 rounded-lg font-semibold nav-link-mobile min-h-[44px]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-6 border-t border-gray-200">
                <Link 
                  href="/contact" 
                  onClick={toggleMenu} 
                  className="btn-primary w-full text-center min-h-[44px] flex items-center justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}