"use client";
import { motion } from "framer-motion";
import {
  FordMark,
  LincolnMark,
  MazdaMark,
  VolvoMark,
} from "@/components/brand-marks";

const BRANDS = [
  { key: "ford", Mark: FordMark, tone: "" },
  { key: "mazda", Mark: MazdaMark, tone: "text-white" },
  { key: "volvo", Mark: VolvoMark, tone: "text-white" },
  { key: "lincoln", Mark: LincolnMark, tone: "text-white" },
] as const;

export function BrandRibbon() {
  return (
    <section
      aria-label="Marcas autorizadas"
      className="relative border-y border-gold-500/15 bg-petrol-950/90 backdrop-blur-sm"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(181,143,74,0.12)_50%,transparent_100%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-10 md:flex-row md:justify-between md:gap-4 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gold-400/70" />
          <span className="text-[10px] font-medium uppercase tracking-[0.42em] text-gold-300">
            Marcas Autorizadas
          </span>
          <span className="h-px w-10 bg-gold-400/70 md:hidden" />
        </div>

        <div className="grid w-full grid-cols-2 items-center gap-8 sm:grid-cols-4 md:w-auto md:gap-12 lg:gap-16">
          {BRANDS.map(({ key, Mark, tone }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center justify-center"
            >
              <Mark
                className={`h-9 w-auto md:h-11 ${tone} opacity-90 transition-opacity duration-500 hover:opacity-100`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
