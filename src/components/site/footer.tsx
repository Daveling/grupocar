import { AGENCIES, BRAND_META } from "@/lib/agencies";
import { BrandLockup, GrupoCarMark } from "@/components/brand-marks";

export function Footer() {
  const year = new Date().getFullYear();
  const brands = ["ford", "mazda", "volvo", "lincoln"] as const;

  return (
    <footer className="relative overflow-hidden border-t border-gold-400/20 bg-petrol-950 py-14 sm:py-20">
      <div className="absolute inset-0 bg-lux-grid-dark opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 sm:gap-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white shadow-inner shadow-black/40">
              <GrupoCarMark className="h-full w-full" />
            </span>
            <span className="font-display text-xl font-semibold tracking-[0.22em] text-white">
              GRUPO CAR
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
            Distribuidor autorizado Ford, Mazda, Volvo y Lincoln en Nuevo
            León, Coahuila, Tamaulipas y Chihuahua. Una experiencia
            automotriz premium en el noreste de México.
          </p>
          <div className="mt-6 text-[10px] font-medium uppercase tracking-[0.32em] text-gold-300/80">
            Grupo Car S.A. de C.V.
          </div>
        </div>

        {brands.map((b) => (
          <div key={b}>
            <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
              <BrandLockup
                brand={b}
                className={`h-6 w-auto ${b === "ford" ? "" : "text-white"}`}
              />
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold-300">
              {BRAND_META[b].label}
            </div>
            <ul className="mt-4 space-y-2.5">
              {AGENCIES.filter((a) => a.brand === b).map((a) => (
                <li key={a.id}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/65 transition-colors hover:text-gold-200"
                  >
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col items-start justify-between gap-4 border-t border-white/10 px-5 pt-8 text-[10px] uppercase tracking-[0.24em] text-white/45 sm:mt-16 sm:px-6 sm:text-[11px] sm:tracking-[0.28em] md:flex-row md:items-center lg:px-10">
        <div>© {year} Grupo Car S.A. de C.V. — Todos los derechos reservados.</div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6">
          <span>Noreste · México</span>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <a
            href="mailto:diego.munguia@grupocar.mx"
            className="break-all normal-case tracking-normal text-white/60 transition-colors hover:text-gold-200 sm:uppercase sm:tracking-[0.28em] sm:text-white/45"
          >
            diego.munguia@grupocar.mx
          </a>
        </div>
      </div>
    </footer>
  );
}
