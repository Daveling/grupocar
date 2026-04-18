export type Brand = "ford" | "mazda" | "volvo" | "lincoln";

export interface Agency {
  id: number;
  brand: Brand;
  name: string;
  city: string;
  state: string;
  address: string;
  href: string;
}

export const AGENCIES: Agency[] = [
  {
    id: 1,
    brand: "ford",
    name: "Ford Miguel Alemán",
    city: "Cd. Miguel Alemán",
    state: "Tamaulipas",
    address:
      "Prol. José Ángel Guerra, Lucha Social, Cd. Miguel Alemán, Tamaulipas",
    href: "https://www.fordmiguelaleman.mx/",
  },
  {
    id: 2,
    brand: "ford",
    name: "Ford Sabinas",
    city: "Sabinas",
    state: "Coahuila",
    address: "Carretera México 15 S/N, Zona Industrial, Sabinas, Coahuila",
    href: "https://www.fordsabinas.mx/",
  },
  {
    id: 3,
    brand: "ford",
    name: "Ford Saltillo",
    city: "Saltillo",
    state: "Coahuila",
    address:
      "Blvd. Venustiano Carranza 4600, Virreyes Residencial, Saltillo, Coahuila",
    href: "https://www.fordsaltillo.mx/",
  },
  {
    id: 4,
    brand: "mazda",
    name: "Mazda Monclova",
    city: "Monclova",
    state: "Coahuila",
    address:
      "Blvd. Harold R. Pape 2013, Col. Universitaria, Monclova, Coahuila",
    href: "https://www.mazda.mx/distribuidores/mazda-monclova",
  },
  {
    id: 5,
    brand: "mazda",
    name: "Mazda Saltillo",
    city: "Saltillo",
    state: "Coahuila",
    address:
      "Blvd. Venustiano Carranza 4480, Virreyes Residencial, Saltillo, Coahuila",
    href: "https://www.mazda.mx/distribuidores/mazda-saltillo",
  },
  {
    id: 6,
    brand: "mazda",
    name: "Mazda Piedras Negras",
    city: "Piedras Negras",
    state: "Coahuila",
    address:
      "Av. H. Colegio Militar 914, Las Fuentes, Piedras Negras, Coahuila",
    href: "https://www.mazda.mx/distribuidores/mazda-piedras-negras",
  },
  {
    id: 7,
    brand: "volvo",
    name: "Volvo Valle Oriente",
    city: "San Pedro Garza García",
    state: "Nuevo León",
    address:
      "Av. Lázaro Cárdenas 2660, Valle Oriente, San Pedro Garza García, Nuevo León",
    href: "https://sueciacarmonterrey.com/",
  },
  {
    id: 8,
    brand: "volvo",
    name: "Volvo Cumbres",
    city: "Monterrey",
    state: "Nuevo León",
    address:
      "Av. Paseo de los Leones 3200, Bosques de las Cumbres, Monterrey, Nuevo León",
    href: "https://sueciacarmonterrey.com/",
  },
  {
    id: 9,
    brand: "volvo",
    name: "Volvo Saltillo",
    city: "Saltillo",
    state: "Coahuila",
    address:
      "Blvd. Venustiano Carranza 4620, Virreyes Residencial, Saltillo, Coahuila",
    href: "https://sueciacarmonterrey.com/",
  },
  {
    id: 10,
    brand: "volvo",
    name: "Volvo Chihuahua",
    city: "Chihuahua",
    state: "Chihuahua",
    address:
      "Periférico de la Juventud 7705, Cumbres IV Etapa, Chihuahua, Chihuahua",
    href: "https://sueciacarmonterrey.com/",
  },
  {
    id: 11,
    brand: "lincoln",
    name: "Lincoln Saltillo",
    city: "Saltillo",
    state: "Coahuila",
    address:
      "Blvd. Venustiano Carranza 4600, Virreyes Residencial, 25230 Saltillo, Coahuila",
    href: "https://lincolnsaltillo.mx/",
  },
];

export const BRAND_META: Record<Brand, { label: string; tagline: string }> = {
  ford: {
    label: "Ford",
    tagline: "Built Ford Tough · Desempeño americano.",
  },
  mazda: {
    label: "Mazda",
    tagline: "Kodo Design · Ingeniería japonesa premium.",
  },
  volvo: {
    label: "Volvo",
    tagline: "Scandinavian Luxury · Seguridad y sofisticación.",
  },
  lincoln: {
    label: "Lincoln",
    tagline: "American Luxury · Refinamiento y elegancia.",
  },
};

/**
 * Per-brand gradient classes (written out in full so Tailwind's JIT
 * can pick them up — do NOT concatenate these from outside files).
 */
export const BRAND_GRADIENT: Record<Brand, string> = {
  ford: "bg-gradient-to-br from-navy-700 via-navy-900 to-navy-950",
  mazda: "bg-gradient-to-br from-wine-700 via-wine-900 to-navy-950",
  volvo: "bg-gradient-to-br from-graphite-300 via-graphite-600 to-graphite-900",
  lincoln: "bg-gradient-to-br from-graphite-700 via-graphite-900 to-[#0d0d10]",
};
