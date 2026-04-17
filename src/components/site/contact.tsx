"use client";
import { motion } from "framer-motion";
import { Mail, User, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden border-t border-gold-500/10 bg-gradient-to-b from-petrol-800 via-petrol-900 to-petrol-950 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-lux-grid opacity-35" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="mb-6 block text-[11px] font-medium uppercase tracking-[0.42em] text-gold-400">
            — Contacto —
          </span>
          <h2 className="font-display text-5xl font-light leading-[1.02] tracking-tight text-white md:text-[88px]">
            Hablemos de tu
            <br />
            <span className="italic text-gold-300">
              próximo automóvil.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-white/65">
            Atención directa para clientes corporativos, flotillas y
            experiencias premium.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-5 md:grid-cols-2">
          {[
            {
              icon: User,
              label: "Contacto",
              value: "Diego Munguía Camou",
              href: "mailto:DiegoMunguiaC@grupocar.mx",
            },
            {
              icon: Mail,
              label: "Correo",
              value: "DiegoMunguiaC@grupocar.mx",
              href: "mailto:DiegoMunguiaC@grupocar.mx",
            },
          ].map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gold-400/20 bg-petrol-950 p-8 shadow-xl shadow-black/50 transition-all duration-700 hover:border-gold-400/60 hover:bg-navy-950"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/40 bg-gradient-to-br from-navy-800 to-wine-900 text-gold-200">
                  <c.icon size={18} strokeWidth={1.5} />
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-white/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-300"
                />
              </div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-400">
                  {c.label}
                </div>
                <div className="mt-2 font-display text-2xl font-light text-white">
                  {c.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 flex max-w-4xl flex-col items-center gap-8 rounded-3xl border border-gold-400/40 bg-navy-950 p-10 text-center shadow-2xl shadow-black/60 md:p-16"
        >
          <div className="text-[11px] font-medium uppercase tracking-[0.42em] text-gold-300">
            Grupo Car SA de CV
          </div>
          <h3 className="font-display text-4xl font-light leading-tight text-white md:text-6xl">
            Una cita, una entrega,
            <br />
            <span className="italic text-gold-200">una impresión duradera.</span>
          </h3>
          <a
            href="mailto:DiegoMunguiaC@grupocar.mx?subject=Cita%20Grupo%20CAR"
            className="group relative mt-2 inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold-400 px-10 py-5 text-sm font-semibold uppercase tracking-[0.28em] text-navy-950 transition-all duration-500 hover:bg-gold-300"
          >
            <span className="relative z-10">Agendar Cita Privada</span>
            <ArrowUpRight
              className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              size={16}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
