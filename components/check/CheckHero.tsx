"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ReachUpArch from "./ReachUpArch";

export default function CheckHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  // Parallax on mouse move
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
      }
      if (archRef.current) {
        archRef.current.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const scrollToCheck = () => {
    document.getElementById("check")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[var(--color-charcoal)]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/bg-dark.jpg" alt="" fill className="object-cover opacity-30" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-charcoal)] via-[var(--color-charcoal)]/70 to-[var(--color-cognac)]/15" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-charcoal)] to-transparent" />
      </div>

      {/* (arch is now behind Julia) */}

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 md:px-12 h-full min-h-[100dvh] flex items-center">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center w-full py-28 md:py-0">

          {/* Left — Text */}
          <div className="order-2 md:order-1 max-w-xl">
            <div className="animate-fade-up flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-[var(--color-gold)]" />
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)]">
                90-Sekunden Hotel-Check
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] text-white leading-[1.05] mb-7 tracking-[-0.015em]">
              Was verschenkt<br />
              dein Hotel an<br />
              <span className="text-[var(--color-gold)] italic">Booking &amp; Co?</span>
            </h1>

            <p className="animate-fade-up-delay-2 text-[var(--color-stone)] text-[17px] md:text-[18px] leading-[1.7] mb-10 max-w-md font-light">
              5 Fragen. Eine ehrliche Einschätzung deines
              Direktbuchungs-Potenzials. Komplett kostenlos
              — ohne Haken.
            </p>

            {/* CTA with hover effects */}
            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-start gap-6">
              <button
                onClick={scrollToCheck}
                className="arrow-hover group relative px-10 py-5 bg-[var(--color-cognac)] text-white text-[13px] font-semibold tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-[0_20px_60px_-10px_rgba(150,75,60,0.5)] hover-lift"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-500" />

                <span className="relative z-10 flex items-center gap-3">
                  Jetzt Check starten
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </span>

                {/* Pulse ring on hover */}
                <span className="absolute inset-0 rounded-sm border-2 border-[var(--color-cognac)] opacity-0 group-hover:animate-[pulse-ring_1.5s_ease-out_infinite]" />
              </button>

              <div className="flex flex-col gap-2 text-[var(--color-stone)] text-[12px]">
                <span className="flex items-center gap-2 group/item cursor-default">
                  <svg className="w-3.5 h-3.5 text-[var(--color-gold)]/50 transition-all duration-300 group-hover/item:text-[var(--color-gold)] group-hover/item:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="transition-colors duration-300 group-hover/item:text-white/60">Dauert nur 90 Sekunden</span>
                </span>
                <span className="flex items-center gap-2 group/item cursor-default">
                  <svg className="w-3.5 h-3.5 text-[var(--color-gold)]/50 transition-all duration-300 group-hover/item:text-[var(--color-gold)] group-hover/item:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="transition-colors duration-300 group-hover/item:text-white/60">Komplett kostenlos</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right — Julia with parallax + Arch behind */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative">
              {/* Arch — offset behind and to the right, fully visible */}
              <div
                ref={archRef}
                className="absolute -right-16 -top-12 md:-right-24 md:-top-16 opacity-[0.12] pointer-events-none transition-transform duration-[800ms] ease-out"
              >
                <ReachUpArch className="w-[220px] md:w-[320px] h-auto" color="#C9B585" strokeWidth={4} />
              </div>

              {/* Glow */}
              <div className="absolute -inset-8 bg-[var(--color-cognac)]/8 rounded-[2rem] blur-[60px]" />

              {/* Image — moves with mouse */}
              <div
                ref={imageRef}
                className="relative w-64 h-80 md:w-[300px] md:h-[420px] rounded-[1.25rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] transition-transform duration-[600ms] ease-out hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]"
              >
                <Image
                  src="/julia.jpg"
                  alt="Julia — ReachUp Consulting"
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-white text-[15px] font-serif font-semibold">Julia</p>
                  <p className="text-white/70 text-[11px] tracking-[0.15em] uppercase font-sans">
                    ReachUp Consulting
                  </p>
                </div>
              </div>

              {/* Floating tag */}
              <div className="absolute -right-4 top-8 md:-right-6 bg-[var(--color-charcoal)]/90 backdrop-blur-xl border border-white/[0.08] rounded-lg px-4 py-2.5 shadow-xl animate-float">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                  Dein Ansprechpartner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — animated */}
      <button
        onClick={scrollToCheck}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 group cursor-pointer"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 group-hover:text-white/40 transition-colors">
          Scroll
        </span>
        <div className="relative w-px h-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-gold)]/40 to-transparent" />
          <div className="absolute top-0 w-px h-4 bg-[var(--color-gold)]/60 animate-[slide-right_1.5s_ease-in-out_infinite] origin-top" style={{ animation: "scrollIndicator 1.5s ease-in-out infinite" }} />
        </div>
      </button>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)]/25 to-transparent" />
    </section>
  );
}
