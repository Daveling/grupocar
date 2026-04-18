"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AGENCIES, BRAND_META, BRAND_GRADIENT, type Brand } from "@/lib/agencies";
import { BrandLockup } from "@/components/brand-marks";

const BRANDS: {
  key: Brand;
  description: string;
  lineup: string[];
}[] = [
  {
    key: "ford",
    description:
      "Potencia americana y tecnología de vanguardia. Camionetas, SUVs y eléctricos que definen el estándar de trabajo y aventura.",
    lineup: ["Ranger", "F-150", "Bronco", "Mustang Mach-E", "Explorer"],
  },
  {
    key: "mazda",
    description:
      "Kodo, la filosofía japonesa del movimiento. Cada curva, cada material, expresa artesanía y emoción al conducir.",
    lineup: ["CX-5", "CX-50", "CX-70", "CX-90", "Mazda3"],
  },
  {
    key: "volvo",
    description:
      "Lujo escandinavo y electrificación inteligente. Seguridad humana en cada detalle, diseño que respira serenidad.",
    lineup: ["XC90", "XC60", "XC40 Recharge", "EX30", "S90"],
  },
];

export function Brands() {
  return (
    <section
      id="marcas"
      className="relative isolate overflow-hidden border-t border-gold-500/10 bg-petrol-800 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-lux-grid opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="mb-6 text-[11px] font-medium uppercase tracking-[0.42em] text-gold-400">
            — Nuestras Marcas —
          </span>
          <h2 className="max-w-4xl font-display text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl">
            Cuatro legados.{" "}
            <span className="italic text-gold-300">Una sola</span>
            <br />
            exigencia.
          </h2>
          <p className="mt-8 max-w-2xl text-balance text-white/65">
            Cada marca representa una filosofía distinta de la movilidad — y
            en Grupo CAR las reunimos bajo un mismo estándar de servicio.
          </p>
        </div>

        <div className="grid gap-8 md:gap-10 lg:grid-cols-3">
          {BRANDS.map((brand, i) => {
            const meta = BRAND_META[brand.key];
            const gradient = BRAND_GRADIENT[brand.key];
            const count = AGENCIES.filter((a) => a.brand === brand.key).length;
            return (
              <motion.article
                key={brand.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 1,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold-400/15 bg-petrol-950 shadow-2xl shadow-black/50 transition-all duration-700 hover:border-gold-400/50 hover:shadow-black/60"
              >
                {/* Logo canvas (replaces stock photo) */}
                <div
                  className={`relative h-56 overflow-hidden ${gradient}`}
                >
                  <div className="absolute inset-0 bg-pinstripe opacity-60" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />

                  {/* Count badge */}
                  <div className="absolute left-6 top-6 rounded-full border border-gold-300/40 bg-navy-950/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.32em] text-gold-100 backdrop-blur-md">
                    {count} Agencias
                  </div>

                  {/* Arrow */}
                  <ArrowUpRight
                    className="absolute right-6 top-6 h-6 w-6 text-gold-200 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300"
                    strokeWidth={1.25}
                  />

                  {/* Centered logo lockup */}
                  <div className="absolute inset-0 flex items-center justify-center px-8">
                    <BrandLockup
                      brand={brand.key}
                      className={`h-14 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)] md:h-16 ${
                        brand.key === "ford" ? "" : "text-white"
                      }`}
                    />
                  </div>

                  {/* Brand label */}
                  <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                    <h3 className="font-display text-4xl font-light tracking-tight text-white/90 drop-shadow-lg md:text-5xl">
                      {meta.label}
                    </h3>
                    <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-300/80">
                      Distribuidor
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col gap-6 p-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/50">
                      Marca
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold-400">
                      · Autorizado ·
                    </span>
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-wine-300">
                    {meta.tagline}
                  </p>
                  <p className="text-sm leading-relaxed text-white/75">
                    {brand.description}
                  </p>

                  <div>
                    <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em] text-white/45">
                      Lineup Destacado
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {brand.lineup.map((model) => (
                        <span
                          key={model}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/80"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#agencias"
                    className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-[11px] font-medium uppercase tracking-[0.32em] text-white/65 transition-colors hover:text-gold-300"
                  >
                    Ver agencias {meta.label}
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>

                {/* Hover gold halo */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-gold-400/0 transition-colors duration-700 group-hover:border-gold-400/40" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
