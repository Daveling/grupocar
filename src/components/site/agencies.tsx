"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight, Building2, Compass, Flag } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { AGENCIES, BRAND_META, BRAND_GRADIENT, type Brand } from "@/lib/agencies";

const ALL_FILTER = "todas" as const;
type Filter = Brand | typeof ALL_FILTER;

const FILTERS: { key: Filter; label: string }[] = [
  { key: ALL_FILTER, label: "Todas" },
  { key: "ford", label: "Ford" },
  { key: "mazda", label: "Mazda" },
  { key: "volvo", label: "Volvo" },
];

// Pick an icon per brand for the orbital timeline
const BRAND_ICON: Record<Brand, React.ElementType> = {
  ford: Compass,
  mazda: Flag,
  volvo: Building2,
};

export function Agencies() {
  const [filter, setFilter] = useState<Filter>(ALL_FILTER);

  const filtered = useMemo(
    () =>
      filter === ALL_FILTER
        ? AGENCIES
        : AGENCIES.filter((a) => a.brand === filter),
    [filter],
  );

  const timelineData = useMemo(
    () =>
      AGENCIES.map((a, idx) => ({
        id: a.id,
        title: a.name,
        date: a.state,
        category: BRAND_META[a.brand].label,
        content: a.address,
        icon: BRAND_ICON[a.brand],
        relatedIds: AGENCIES.filter(
          (b) => b.brand === a.brand && b.id !== a.id,
        ).map((b) => b.id),
        status: (idx % 3 === 0
          ? "completed"
          : idx % 3 === 1
            ? "in-progress"
            : "pending") as "completed" | "in-progress" | "pending",
        energy: 70 + ((idx * 7) % 25),
        href: a.href,
        brand: a.brand,
      })),
    [],
  );

  return (
    <section
      id="agencias"
      className="relative isolate overflow-hidden border-t border-gold-500/10 bg-petrol-800 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-lux-grid opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-end gap-10 border-b border-white/10 pb-16 md:grid-cols-[2fr_1fr]">
          <div>
            <span className="mb-6 block text-[11px] font-medium uppercase tracking-[0.42em] text-gold-400">
              — Red de Agencias —
            </span>
            <h2 className="max-w-3xl font-display text-5xl font-light leading-[1.02] tracking-tight text-white md:text-7xl">
              Presencia en el{" "}
              <span className="italic text-gold-300">noreste</span> del país.
            </h2>
          </div>
          <p className="text-balance text-white/65 md:text-right">
            Diez agencias, cuatro estados y tres marcas que definen el
            estándar de la industria. Selecciona una sede para explorarla.
          </p>
        </div>

        {/* Orbital visualization */}
        <div className="mt-14 md:mt-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-white/50">
              Navegador Interactivo
            </span>
            <span className="hairline flex-1" />
          </div>
          <RadialOrbitalTimeline timelineData={timelineData} />
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.28em] text-white/45">
            Toca cualquier agencia para ver detalles y visitar el sitio oficial
          </p>
        </div>

        {/* Filters */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {FILTERS.map((f) => {
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`relative overflow-hidden rounded-full border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition-all duration-500 ${
                  isActive
                    ? "border-gold-400 bg-gold-400 text-navy-950 shadow-md shadow-gold-500/30"
                    : "border-white/15 bg-white/[0.04] text-white/70 hover:border-gold-400/60 hover:text-white"
                }`}
              >
                {f.label}
                {isActive && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute inset-0 -z-10 rounded-full bg-gold-400"
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Agency cards grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => {
              const meta = BRAND_META[a.brand];
              const gradient = BRAND_GRADIENT[a.brand];
              return (
                <motion.a
                  key={a.id}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer"
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.96 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-white/10 ${gradient} p-7 text-left shadow-2xl shadow-black/40 transition-all duration-700 hover:border-gold-400/60 hover:shadow-gold-500/20`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-pinstripe opacity-50" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-gold-300/60 bg-navy-950/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.32em] text-gold-100 backdrop-blur-md">
                        {meta.label}
                      </span>
                      <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
                        {a.state}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-gold-300 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-200"
                      strokeWidth={1.2}
                    />
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-[28px] font-light leading-tight tracking-tight text-white">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em] text-gold-200">
                      {a.city}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-start gap-3 border-t border-white/15 pt-4">
                    <MapPin
                      size={14}
                      className="mt-0.5 flex-shrink-0 text-gold-300"
                    />
                    <p className="text-xs leading-relaxed text-white/80">
                      {a.address}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
