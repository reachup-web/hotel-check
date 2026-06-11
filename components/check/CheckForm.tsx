"use client";

import { useState, useRef, useEffect } from "react";
import type { CheckData } from "@/app/page";
import ReachUpArch from "./ReachUpArch";

interface Props {
  onComplete: (data: CheckData) => void;
}

type StepKey = "hotel" | "rooms" | "otaAndRate" | "contact";

const ROOM_OPTIONS = [
  { value: 20, label: "Unter 30", emoji: "🏠" },
  { value: 40, label: "30 – 50", emoji: "🏨" },
  { value: 65, label: "50 – 80", emoji: "🏩" },
  { value: 90, label: "80 – 100", emoji: "🏬" },
  { value: 120, label: "Über 100", emoji: "🏰" },
];

const OTA_OPTIONS = [
  { value: 80, label: "Über 70 %" },
  { value: 65, label: "50 – 70 %" },
  { value: 45, label: "30 – 50 %" },
  { value: 25, label: "Unter 30 %" },
  { value: 60, label: "Weiß ich nicht" },
];

const RATE_OPTIONS = [
  { value: 80, label: "Unter 100 €" },
  { value: 120, label: "100 – 150 €" },
  { value: 175, label: "150 – 200 €" },
  { value: 250, label: "Über 200 €" },
];

const STEPS: { key: StepKey; number: string; label: string; sublabel: string }[] = [
  { key: "hotel", number: "01", label: "Dein Hotel", sublabel: "Erzähl uns von deinem Haus." },
  { key: "rooms", number: "02", label: "Hotelgröße", sublabel: "Wie viele Zimmer hat dein Hotel?" },
  { key: "otaAndRate", number: "03", label: "Deine Zahlen", sublabel: "Wie sieht dein OTA-Anteil aus?" },
  { key: "contact", number: "04", label: "Fast geschafft", sublabel: "Damit wir dir deine Auswertung zukommen lassen können." },
];

export default function CheckForm({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [data, setData] = useState({
    hotelName: "",
    city: "",
    rooms: 0,
    otaPercent: 0,
    avgRate: 0,
    contactName: "",
    contactPosition: "",
    contactEmail: "",
    contactPhone: "",
  });

  const current = STEPS[step];
  const totalSteps = STEPS.length;

  const canProceed = (): boolean => {
    switch (current.key) {
      case "hotel":
        return data.hotelName.trim().length > 0 && data.city.trim().length > 0;
      case "rooms":
        return data.rooms > 0;
      case "otaAndRate":
        return data.otaPercent > 0 && data.avgRate > 0;
      case "contact":
        return (
          data.contactName.trim().length > 0 &&
          data.contactEmail.includes("@") &&
          data.contactPhone.trim().length > 3
        );
      default:
        return false;
    }
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step === totalSteps - 1) {
      onComplete(data as CheckData);
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s + 1);
      setAnimating(false);
    }, 350);
  };

  const goBack = () => {
    setAnimating(true);
    setTimeout(() => {
      setStep((s) => s - 1);
      setAnimating(false);
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canProceed()) {
      e.preventDefault();
      goNext();
    }
  };

  // Auto-advance when pill is selected (for rooms step)
  useEffect(() => {
    if ((current.key === "rooms" && data.rooms > 0)) {
      const timer = setTimeout(goNext, 400);
      return () => clearTimeout(timer);
    }
  }, [data.rooms]);

  const Pill = ({
    id,
    selected,
    onClick,
    children,
  }: {
    id: string;
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={`relative px-7 py-4 rounded-xl text-[14px] font-medium cursor-pointer border transition-all duration-300 ${
        selected
          ? "bg-[var(--color-cognac)] text-white border-[var(--color-cognac)] shadow-[0_8px_30px_-8px_rgba(150,75,60,0.35)] scale-[1.02]"
          : hovered === id
          ? "bg-white text-[var(--color-charcoal)] border-[var(--color-cognac)]/40 shadow-md -translate-y-0.5"
          : "bg-white text-[var(--color-charcoal)] border-[var(--color-linen)]"
      }`}
    >
      {children}
      {/* Selection ripple */}
      {selected && (
        <span className="absolute inset-0 rounded-xl bg-white/20 animate-[pulse-ring_0.6s_ease-out_1]" />
      )}
    </button>
  );

  const inputClass =
    "w-full bg-white border border-[var(--color-linen)] text-[var(--color-charcoal)] text-[16px] font-serif rounded-xl px-6 py-4.5 outline-none transition-all duration-300 placeholder:text-[var(--color-stone)]/30 focus:border-[var(--color-cognac)]/40 focus:shadow-[0_0_0_6px_rgba(150,75,60,0.05),0_4px_20px_-4px_rgba(150,75,60,0.08)] hover:border-[var(--color-stone)]/20";

  const renderStep = () => {
    switch (current.key) {
      case "hotel":
        return (
          <div className="space-y-5">
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors duration-300 group-focus-within:text-[var(--color-cognac)]">
                Hotelname
              </label>
              <input type="text" value={data.hotelName} onChange={(e) => setData({ ...data, hotelName: e.target.value })} onKeyDown={handleKeyDown} placeholder="z. B. Hotel Sonnenhof" autoFocus className={inputClass} />
            </div>
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors duration-300 group-focus-within:text-[var(--color-cognac)]">
                Stadt / Region
              </label>
              <input type="text" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} onKeyDown={handleKeyDown} placeholder="z. B. Allgäu, München, Salzburg" className={inputClass} />
            </div>
          </div>
        );

      case "rooms":
        return (
          <div className="flex flex-wrap gap-3">
            {ROOM_OPTIONS.map((opt) => (
              <Pill key={opt.value} id={`room-${opt.value}`} selected={data.rooms === opt.value} onClick={() => setData({ ...data, rooms: opt.value })}>
                {opt.label} Zimmer
              </Pill>
            ))}
          </div>
        );

      case "otaAndRate":
        return (
          <div className="space-y-10">
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-4">
                Wie hoch ist deine OTA-Quote?
              </label>
              <div className="flex flex-wrap gap-3">
                {OTA_OPTIONS.map((opt) => (
                  <Pill key={opt.label} id={`ota-${opt.label}`} selected={data.otaPercent === opt.value} onClick={() => setData({ ...data, otaPercent: opt.value })}>
                    {opt.label}
                  </Pill>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-4">
                Durchschnittlicher Zimmerpreis / Nacht
              </label>
              <div className="flex flex-wrap gap-3">
                {RATE_OPTIONS.map((opt) => (
                  <Pill key={opt.value} id={`rate-${opt.value}`} selected={data.avgRate === opt.value} onClick={() => setData({ ...data, avgRate: opt.value })}>
                    {opt.label}
                  </Pill>
                ))}
              </div>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group">
                <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors group-focus-within:text-[var(--color-cognac)]">Name *</label>
                <input type="text" value={data.contactName} onChange={(e) => setData({ ...data, contactName: e.target.value })} onKeyDown={handleKeyDown} placeholder="Max Mustermann" autoFocus className={inputClass} />
              </div>
              <div className="group">
                <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors group-focus-within:text-[var(--color-cognac)]">Position</label>
                <input type="text" value={data.contactPosition} onChange={(e) => setData({ ...data, contactPosition: e.target.value })} onKeyDown={handleKeyDown} placeholder="z. B. Inhaber" className={inputClass} />
              </div>
            </div>
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors group-focus-within:text-[var(--color-cognac)]">E-Mail *</label>
              <input type="email" value={data.contactEmail} onChange={(e) => setData({ ...data, contactEmail: e.target.value })} onKeyDown={handleKeyDown} placeholder="max@hotel-sonnenhof.de" className={inputClass} />
            </div>
            <div className="group">
              <label className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--color-stone)] mb-2.5 transition-colors group-focus-within:text-[var(--color-cognac)]">Telefon *</label>
              <input type="tel" value={data.contactPhone} onChange={(e) => setData({ ...data, contactPhone: e.target.value })} onKeyDown={handleKeyDown} placeholder="+49 ..." className={inputClass} />
            </div>
            <div className="flex items-start gap-3 pt-3">
              <svg className="w-4 h-4 text-[var(--color-gold)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <p className="text-[12px] text-[var(--color-stone)] leading-relaxed">
                Deine Daten sind sicher. Wir kontaktieren dich innerhalb von 48 Stunden persönlich.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <section ref={sectionRef} id="check" className="relative bg-[var(--color-warm-white)] py-24 md:py-32 overflow-hidden">
      {/* Decorative */}
      <div className="absolute -left-16 top-12 opacity-[0.02] pointer-events-none">
        <ReachUpArch className="w-[200px] h-auto" color="var(--color-cognac)" strokeWidth={6} />
      </div>

      <div className="relative z-10 max-w-[600px] mx-auto px-8 md:px-10">
        {/* Step indicator with interactive hover */}
        <div className="flex items-center justify-between mb-16">
          {STEPS.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div
                className={`group flex flex-col items-center cursor-default transition-all duration-300 ${
                  i <= step ? "opacity-100" : "opacity-30 hover:opacity-50"
                }`}
              >
                <span
                  className={`text-[11px] font-bold tracking-[0.15em] transition-all duration-300 ${
                    i === step
                      ? "text-[var(--color-cognac)] scale-125"
                      : i < step
                      ? "text-[var(--color-cognac)]"
                      : "text-[var(--color-linen)]"
                  }`}
                >
                  {s.number}
                </span>
                {i === step && (
                  <div className="w-5 h-[2px] bg-[var(--color-cognac)] mt-1.5 rounded-full" />
                )}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-px mx-3 transition-all duration-700 ${
                    i < step ? "bg-[var(--color-cognac)]" : "bg-[var(--color-linen)]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Content with transition */}
        <div
          className={`transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            animating ? "opacity-0 translate-y-10 scale-[0.98]" : "opacity-100 translate-y-0 scale-100"
          }`}
        >
          <div className="mb-10">
            <h2 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] text-[var(--color-charcoal)] leading-[1.15] mb-2">
              {current.label}
            </h2>
            <p className="text-[var(--color-stone)] text-[15px] font-light">
              {current.sublabel}
            </p>
          </div>

          {renderStep()}

          {/* Nav */}
          <div className="flex items-center justify-between mt-14 pt-8 border-t border-[var(--color-linen)]">
            {step > 0 ? (
              <button
                onClick={goBack}
                className="arrow-hover group flex items-center gap-2 text-[13px] text-[var(--color-stone)] hover:text-[var(--color-charcoal)] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Zurück
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={goNext}
              disabled={!canProceed()}
              className={`group flex items-center gap-3 px-8 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer hover-lift ${
                canProceed()
                  ? "bg-[var(--color-cognac)] text-white hover:shadow-[0_12px_40px_-12px_rgba(150,75,60,0.4)]"
                  : "bg-[var(--color-linen)] text-[var(--color-stone)]/30 cursor-not-allowed"
              }`}
            >
              {step === totalSteps - 1 ? "Auswertung anzeigen" : "Weiter"}
              {canProceed() && (
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
