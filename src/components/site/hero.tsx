"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Shield } from "lucide-react";
import {
  AGENCIES,
  BRAND_META,
  BRAND_GRADIENT,
  type Brand,
} from "@/lib/agencies";
import { BrandLockup } from "@/components/brand-marks";

const STATS = [
  { value: "11", label: "Agencias" },
  { value: "04", label: "Estados" },
  { value: "04", label: "Marcas" },
  { value: "25+", label: "Años" },
];

const BRAND_CARDS: {
  key: Brand;
  description: string;
  lineup: string[];
}[] = [
  {
    key: "ford",
    description:
      "Potencia americana y tecnología de vanguardia. Camionetas, SUVs y eléctricos.",
    lineup: ["Ranger", "F-150", "Bronco", "Mustang Mach-E", "Explorer"],
  },
  {
    key: "mazda",
    description:
      "Kodo, la filosofía japonesa del movimiento. Artesanía y emoción al conducir.",
    lineup: ["CX-5", "CX-50", "CX-70", "CX-90", "Mazda3"],
  },
  {
    key: "volvo",
    description:
      "Lujo escandinavo y electrificación inteligente. Seguridad humana en cada detalle.",
    lineup: ["XC90", "XC60", "XC40 Recharge", "EX30", "S90"],
  },
  {
    key: "lincoln",
    description:
      "Lujo americano refinado. Silencio, confort y presencia ejecutiva en cada detalle.",
    lineup: ["Navigator", "Nautilus", "Aviator", "Corsair"],
  },
];

export function Hero() {
  const [openBrand, setOpenBrand] = useState<Brand | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openBrand) return;
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenBrand(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenBrand(null);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [openBrand]);

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-petrol-800 via-petrol-900 to-petrol-950" />
      <div className="absolute inset-0 -z-10 bg-lux-grid opacity-[0.3]" />
      <div className="absolute inset-0 -z-10 radial-spotlight" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex items-center gap-2 rounded-full border border-gold-400/25 bg-white/[0.04] px-4 py-2 backdrop-blur-xl sm:gap-3 sm:px-5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold-100/85 sm:text-[11px] sm:tracking-[0.32em]">
            Distribuidor Autorizado · Noreste de México
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-4xl text-balance text-center font-display text-[44px] font-light leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Cuatro legados.{" "}
          <span className="shine-text italic">Una sola exigencia.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-6 max-w-2xl text-balance text-center text-sm leading-relaxed text-white/65 md:text-base"
        >
          Grupo CAR representa a Ford, Mazda, Volvo y Lincoln en Nuevo León,
          Coahuila, Tamaulipas y Chihuahua. Una red construida sobre
          precisión, servicio y confianza.
        </motion.p>

        {/* Brand cards — hero centerpiece */}
        <div id="marcas" className="mt-12 grid w-full gap-5 sm:mt-16 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {BRAND_CARDS.map((brand, i) => {
            const meta = BRAND_META[brand.key];
            const gradient = BRAND_GRADIENT[brand.key];
            const count = AGENCIES.filter(
              (a) => a.brand === brand.key,
            ).length;
            return (
              <motion.article
                key={brand.key}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.45 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold-400/15 bg-petrol-950 shadow-2xl shadow-black/50 transition-all duration-700 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-black/60"
              >
                {/* Logo header */}
                <div
                  className={`relative h-44 overflow-hidden sm:h-52 ${gradient}`}
                >
                  <div className="absolute inset-0 bg-pinstripe opacity-55" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-gold-300/40 bg-petrol-950/75 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.24em] text-gold-100 backdrop-blur-md sm:left-6 sm:top-6 sm:px-3 sm:text-[10px] sm:tracking-[0.32em]">
                    {count} Agencias
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8">
                    <BrandLockup
                      brand={brand.key}
                      className={`h-12 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)] sm:h-14 md:h-16 ${
                        brand.key === "ford" ? "" : "text-white"
                      }`}
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between sm:bottom-5 sm:left-6 sm:right-6">
                    <h3 className="font-display text-3xl font-light tracking-tight text-white/95 drop-shadow-lg sm:text-4xl">
                      {meta.label}
                    </h3>
                    <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-gold-300/80 sm:text-[10px] sm:tracking-[0.32em]">
                      Distribuidor
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6 sm:gap-5 sm:p-7">
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-wine-300">
                    {meta.tagline}
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    {brand.description}
                  </p>
                  <div>
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.32em] text-white/45">
                      Lineup Destacado
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.lineup.map((model) => (
                        <span
                          key={model}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] text-white/80"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="relative mt-auto"
                    ref={openBrand === brand.key ? dropdownRef : undefined}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenBrand((prev) =>
                          prev === brand.key ? null : brand.key,
                        )
                      }
                      aria-expanded={openBrand === brand.key}
                      aria-haspopup="menu"
                      className="flex w-full items-center justify-between border-t border-white/10 pt-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white/65 transition-colors hover:text-gold-300"
                    >
                      <span>Visitar sitio {meta.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          openBrand === brand.key ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openBrand === brand.key && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          role="menu"
                          className="absolute bottom-full left-0 right-0 z-20 mb-3 overflow-hidden rounded-xl border border-gold-400/25 bg-petrol-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
                        >
                          <ul className="divide-y divide-white/5">
                            {AGENCIES.filter(
                              (a) => a.brand === brand.key,
                            ).map((a) => (
                              <li key={a.id}>
                                <a
                                  href={a.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  onClick={() => setOpenBrand(null)}
                                  role="menuitem"
                                  className="flex items-center justify-between gap-3 px-4 py-3 text-left text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-gold-200"
                                >
                                  <span className="flex flex-col">
                                    <span className="font-medium">
                                      {a.name}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                                      {a.state}
                                    </span>
                                  </span>
                                  <ArrowUpRight
                                    size={14}
                                    className="flex-shrink-0 text-gold-300/80"
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#agencias"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-500 hover:bg-gold-300"
          >
            <span className="relative z-10">Explorar Agencias</span>
            <ArrowDownRight
              className="relative z-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
              size={16}
            />
          </a>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm transition-all duration-500 hover:border-gold-400/60 hover:bg-white/[0.06]"
          >
            Agendar Cita
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold-400/30 bg-gold-400/20 shadow-2xl shadow-black/50 backdrop-blur-xl md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="relative bg-petrol-950 px-4 py-6 text-center transition-colors duration-500 hover:bg-petrol-900 sm:px-6 sm:py-7"
            >
              <div className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.32em] text-gold-200/70">
                {s.label}
              </div>
              {i < STATS.length - 1 && (
                <span className="absolute right-0 top-1/4 hidden h-1/2 w-px bg-white/10 md:block" />
              )}
            </div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
          <span className="flex items-center gap-2">
            <Shield size={12} className="text-gold-400" />
            Garantía Oficial
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>Servicio Certificado</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>Financiamiento Premium</span>
        </div>
      </div>
    </section>
  );
}
