"use client";

import { useEffect, useState } from "react";
import type { CheckData } from "@/app/page";
import Image from "next/image";
import ReachUpArch from "./ReachUpArch";

interface Props {
  data: CheckData;
}

function calcROI(data: CheckData) {
  const { rooms, otaPercent, avgRate } = data;
  const occupancy = 0.62;
  const nights = 365;
  const totalRevenue = rooms * avgRate * occupancy * nights;
  const otaRevenue = totalRevenue * (otaPercent / 100);
  const avgCommission = 0.18;
  const currentCommission = otaRevenue * avgCommission;
  const targetReduction = 15;
  const newOtaPercent = Math.max(otaPercent - targetReduction, 10);
  const newOtaRevenue = totalRevenue * (newOtaPercent / 100);
  const newCommission = newOtaRevenue * avgCommission;
  const yearlySavings = currentCommission - newCommission;
  const monthlySavings = yearlySavings / 12;
  const directBookingPercent = 100 - otaPercent;
  const benchmarkDirect = 55;
  return { currentCommission, yearlySavings, monthlySavings, directBookingPercent, benchmarkDirect, otaPercent };
}

function fmt(n: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

/** Animated counter */
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span>
      {prefix}
      {new Intl.NumberFormat("de-DE").format(display)}
      {suffix}
    </span>
  );
}

export default function CheckResult({ data }: Props) {
  const roi = calcROI(data);
  const firstName = data.contactName.split(" ")[0];
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setBarWidth(roi.directBookingPercent), 300);
  }, [roi.directBookingPercent]);

  return (
    <section id="ergebnis">
      {/* ── ROI Section ── */}
      <div className="relative bg-[var(--color-charcoal)] py-24 md:py-32 overflow-hidden">
        <div className="absolute right-[5%] top-[10%] opacity-[0.03] pointer-events-none">
          <ReachUpArch className="w-[400px] h-auto" color="#C9B585" strokeWidth={3} />
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-8 md:px-12">
          {/* Header */}
          <div className="mb-16 animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[var(--color-gold)]" />
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)]">
                Auswertung
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] text-white leading-[1.08] tracking-[-0.015em]">
              {firstName}, so steht<br />
              <span className="text-[var(--color-gold)] italic">{data.hotelName}.</span>
            </h2>
            <p className="text-[var(--color-stone)] text-[15px] mt-3">
              {data.city} &middot; ca. {data.rooms} Zimmer &middot; {data.otaPercent}% OTA
            </p>
          </div>

          {/* Metric Cards with hover */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.05] p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.06] hover:border-white/[0.08] hover-lift cursor-default animate-count-in">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/25 mb-5 group-hover:text-white/35 transition-colors">
                Aktuelle OTA-Kosten / Jahr
              </p>
              <p className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-white font-semibold tracking-tight leading-none mb-3">
                <AnimatedNumber value={roi.currentCommission} suffix=" €" />
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-cognac)] group-hover:animate-pulse" />
                <p className="text-[12px] text-white/30">{roi.otaPercent}% OTA &middot; 18% Ø Provision</p>
              </div>
            </div>

            <div className="group rounded-2xl bg-[var(--color-gold)]/[0.06] border border-[var(--color-gold)]/[0.12] p-8 md:p-10 transition-all duration-500 hover:bg-[var(--color-gold)]/[0.10] hover:border-[var(--color-gold)]/[0.20] hover-lift cursor-default animate-count-in" style={{ animationDelay: "0.15s" }}>
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)]/50 mb-5 group-hover:text-[var(--color-gold)]/70 transition-colors">
                Einsparpotenzial / Jahr
              </p>
              <p className="font-serif text-[clamp(2rem,5vw,3.5rem)] text-[var(--color-gold)] font-semibold tracking-tight leading-none mb-3">
                <AnimatedNumber value={roi.yearlySavings} suffix=" €" />
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--color-gold)] group-hover:animate-pulse" />
                <p className="text-[12px] text-white/30">{fmt(roi.monthlySavings)} pro Monat</p>
              </div>
            </div>
          </div>

          {/* Benchmark with animated bar */}
          <div className="group rounded-2xl bg-white/[0.03] border border-white/[0.05] p-8 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/[0.08]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/25 mb-1">Dein Direktanteil</p>
                <p className="text-white font-serif text-2xl font-semibold">
                  <AnimatedNumber value={roi.directBookingPercent} suffix="%" />
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-gold)]/40 mb-1">DACH-Benchmark</p>
                <p className="text-[var(--color-gold)] font-serif text-2xl font-semibold">{roi.benchmarkDirect}%</p>
              </div>
            </div>

            <div className="relative h-3 bg-white/[0.04] rounded-full overflow-visible">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg, var(--color-cognac), var(--color-cognac-deep))",
                }}
              />
              <div
                className="absolute top-[-6px] bottom-[-6px] flex flex-col items-center"
                style={{ left: `${roi.benchmarkDirect}%` }}
              >
                <div className="w-0.5 h-full bg-[var(--color-gold)] rounded-full" />
              </div>
            </div>

            {roi.directBookingPercent < roi.benchmarkDirect && (
              <p className="text-[13px] text-[var(--color-stone)] mt-5 font-light">
                <span className="text-white font-medium">{roi.benchmarkDirect - roi.directBookingPercent} Prozentpunkte</span> trennen dich vom DACH-Benchmark.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── CTA Section with Hotel Lobby ── */}
      <div className="relative py-28 md:py-36 overflow-hidden">
        {/* High-quality hotel lobby background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=90&auto=format"
            alt="Luxuriöse Hotel-Suite"
            fill
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <div className="relative z-10 max-w-[560px] mx-auto px-8 text-center">
          <div className="w-12 h-[2px] bg-[var(--color-gold)] mx-auto mb-8" />

          <h3 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-white leading-[1.15] mb-5">
            Wir melden uns bei dir —<br className="hidden sm:block" />
            innerhalb von 48 Stunden.
          </h3>

          <p className="text-white/60 text-[15px] leading-[1.8] mb-12 font-light max-w-md mx-auto">
            Kein generischer Sales-Call. Jemand von ReachUp Consulting
            schaut sich deine Zahlen an und bespricht mit dir,
            was für {data.hotelName} wirklich Sinn macht.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[12px] text-white/50">
            {[
              { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", text: "Innerhalb von 48h" },
              { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", text: "Unverbindlich" },
              { icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", text: "Persönliches Gespräch" },
            ].map((item) => (
              <div key={item.text} className="group flex items-center gap-2.5 cursor-default">
                <svg className="w-4 h-4 text-[var(--color-gold)] transition-transform duration-300 group-hover:scale-125" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="transition-colors duration-300 group-hover:text-white/80">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
