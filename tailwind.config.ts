import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0066CC',
          600: '#0052a3',
          700: '#004080',
          800: '#003366',
          900: '#002952',
          950: '#001a33',
          DEFAULT: '#0066CC',
          foreground: '#ffffff',
        },
        secondary: { /* ...your secondary colors */ },
        accent: { /* ...your accent colors */ },
        success: {
            500: '#22c55e',
            /* ...your success colors */ 
        },
        warning: { /* ...your warning colors */ },
        danger: { /* ...your danger colors */ },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { /* ... */ },
        popover: { /* ... */ },
        muted: { /* ... */ },
        destructive: { /* ... */ },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 102, 204, 0.05)',
        DEFAULT: '0 2px 8px rgba(0, 102, 204, 0.1)',
        'md': '0 4px 12px rgba(0, 102, 204, 0.12)',
        'lg': '0 8px 24px rgba(0, 102, 204, 0.15)',
        'xl': '0 12px 40px rgba(0, 102, 204, 0.2)',
        '2xl': '0 20px 60px rgba(0, 102, 204, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 102, 204, 0.05)',
        'glow': '0 0 20px rgba(0, 102, 204, 0.4)',
        'glow-lg': '0 0 40px rgba(0, 102, 204, 0.6)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        'container': '1200px',
        'content': '1400px',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #0066CC 0%, #003366 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;