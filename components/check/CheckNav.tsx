"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function CheckNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[var(--color-warm-white)]/95 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="https://www.reachup-consulting.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
          <Image
            src="/logo-icon.png"
            alt="ReachUp"
            width={24}
            height={24}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={`font-serif text-[15px] tracking-[0.2em] uppercase transition-all duration-700 ${
              scrolled ? "text-[var(--color-charcoal)]" : "text-white"
            }`}
            style={{ fontWeight: 600 }}
          >
            ReachUp
          </span>
        </a>

        {/* Divider + Label */}
        <div className="flex items-center gap-4">
          <div
            className={`hidden md:block h-4 w-px transition-colors duration-700 ${
              scrolled ? "bg-[var(--color-linen)]" : "bg-white/15"
            }`}
          />
          <span
            className={`hidden md:block text-[10px] font-sans font-semibold tracking-[0.25em] uppercase transition-colors duration-700 ${
              scrolled ? "text-[var(--color-stone)]" : "text-white/40"
            }`}
          >
            Hotel-Check
          </span>
        </div>
      </div>
    </nav>
  );
}
