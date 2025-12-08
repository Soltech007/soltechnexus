// app/components/SkipLink.tsx
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        sr-only 
        focus:not-sr-only 
        focus:absolute 
        focus:top-4 
        focus:left-4 
        focus:z-[100] 
        focus:px-6 
        focus:py-3 
        focus:bg-primary-700 
        focus:text-white 
        focus:rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-white
        focus:shadow-lg
        font-semibold
      "
    >
      Skip to main content
    </a>
  );
}