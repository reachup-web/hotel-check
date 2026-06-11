import Image from "next/image";

export default function CheckFooter() {
  return (
    <footer className="bg-[var(--color-charcoal)] border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-12">
        {/* Main footer */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="https://www.reachup-consulting.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <Image
              src="/logo-icon.png"
              alt="ReachUp"
              width={20}
              height={20}
              className="object-contain opacity-60 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-serif text-[13px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white/60 transition-colors">
              ReachUp
            </span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-8 text-[12px] text-white/25">
            <a
              href="mailto:info@reachup-consulting.de"
              className="hover:text-white/50 transition-colors"
            >
              Kontakt
            </a>
            <a
              href="https://www.reachup-consulting.de/#impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Impressum
            </a>
            <a
              href="https://www.reachup-consulting.de/#datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} ReachUp Consulting. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
