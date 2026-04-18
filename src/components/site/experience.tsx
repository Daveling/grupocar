"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    brand: "Ford",
    model: "Territory 2026",
    src: "/carpictures/Ford-Territory-2026-en-Mexico-Precios-y-caracteristicas.png",
  },
  {
    brand: "Ford",
    model: "Bronco",
    src: "/carpictures/fordbronco.jpg",
  },
  {
    brand: "Mazda",
    model: "Mazda 3",
    src: "/carpictures/mazda3.avif",
  },
  {
    brand: "Mazda",
    model: "CX-30",
    src: "/carpictures/mazdacx30.jpg",
  },
  {
    brand: "Volvo",
    model: "EX90",
    src: "/carpictures/Volvoex90.jpg",
  },
  {
    brand: "Volvo",
    model: "XC60",
    src: "/carpictures/Volvoxc60.avif",
  },
  {
    brand: "Lincoln",
    model: "Navigator Black Label",
    src: "/carpictures/2025-Lincoln-Navigator-Black-Label-1-scaled.jpg",
  },
  {
    brand: "Lincoln",
    model: "Nautilus",
    src: "/carpictures/lincolnnautilus.avif",
  },
];

export function Experience() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const current = SLIDES[index];

  return (
    <section
      id="experiencia"
      className="relative isolate overflow-hidden border-t border-gold-500/10 bg-gradient-to-b from-petrol-800 via-petrol-900 to-petrol-800 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-lux-grid-fine opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center md:mb-20">
          <span className="mb-6 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-400">
            — La Experiencia Grupo CAR —
          </span>
          <h2 className="max-w-5xl text-balance font-display text-4xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-[88px]">
            Un proceso de compra
            <br />
            <span className="italic text-gold-200">digno de la marca que</span>{" "}
            <span className="shine-text">representas.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-balance text-white/65">
            Desde la primera cita hasta la entrega — cada paso está diseñado
            con la misma precisión y cuidado con el que se fabrica tu próximo
            vehículo.
          </p>
        </div>

        {/* Vehicle slideshow card */}
        <div className="relative mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 via-[#0a1530] to-navy-950 shadow-2xl shadow-black/40">
          {/* Image area */}
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <AnimatePresence mode="sync">
              <motion.img
                key={current.src}
                src={current.src}
                alt={`${current.brand} ${current.model}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-b from-navy-950/55 via-transparent to-navy-950/80" />
            <div className="absolute inset-0 bg-pinstripe opacity-35" />

            {/* Top HUD */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-8">
              <div className="flex items-center gap-3 rounded-full border border-gold-300/40 bg-navy-950/65 px-4 py-2 backdrop-blur-lg">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${current.brand}-${current.model}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.5 }}
                    className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-100"
                  >
                    {current.brand} · {current.model}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ver slide ${i + 1}`}
                    className={`rounded-full border px-3 py-1.5 text-[10px] tracking-widest transition-all duration-500 ${
                      i === index
                        ? "border-gold-300 bg-gold-500/20 text-gold-100"
                        : "border-white/20 text-white/55 hover:text-white/80"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile dots */}
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2 md:hidden">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-6 bg-gold-300" : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-5 md:grid-cols-4 md:gap-5 md:p-8">
            {[
              { k: "Asesoría", v: "Personalizada" },
              { k: "Test Drive", v: "A domicilio" },
              { k: "Financiamiento", v: "Premium" },
              { k: "Entrega", v: "White-glove" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-xl border border-gold-300/20 bg-white/[0.04] p-4 backdrop-blur-md transition-colors hover:border-gold-300/50 hover:bg-white/[0.07]"
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold-300/80">
                  {item.k}
                </div>
                <div className="mt-2 font-display text-xl text-white md:text-2xl">
                  {item.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
