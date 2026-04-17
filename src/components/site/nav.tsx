"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { GrupoCarMark } from "@/components/brand-marks";

const LINKS = [
  { href: "#marcas", label: "Marcas" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#agencias", label: "Agencias" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-gold-500/10 bg-petrol-900/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[64px] w-full max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
        <Link
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="group flex items-center gap-2 sm:gap-3"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-navy-900/20 transition-transform duration-500 group-hover:rotate-[6deg] sm:h-11 sm:w-11">
            <GrupoCarMark className="h-full w-full" />
            <span className="absolute inset-0 rounded-xl border border-gold-400/30" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-[0.22em] text-white sm:text-lg">
              GRUPO CAR
            </span>
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.32em] text-gold-300/70 sm:block">
              Ford · Mazda · Volvo
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-gold-300"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="group relative hidden overflow-hidden rounded-full border border-gold-400/40 bg-gold-400 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.22em] text-navy-950 transition-all duration-500 hover:bg-gold-300 md:inline-flex"
        >
          <span className="relative z-10">Agendar Cita</span>
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/85 transition-colors hover:border-gold-400/60 hover:text-gold-300 md:hidden"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          "fixed inset-x-0 top-[64px] z-40 origin-top overflow-hidden border-t border-gold-500/10 bg-petrol-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out",
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/5 py-4 text-sm uppercase tracking-[0.22em] text-white/80 transition-colors hover:text-gold-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-5 inline-flex items-center justify-center rounded-full bg-gold-400 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-navy-950 transition-colors hover:bg-gold-300"
          >
            Agendar Cita
          </a>
        </nav>
      </div>
    </header>
  );
}
