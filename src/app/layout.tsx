import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grupo CAR — Ford · Mazda · Volvo · Lincoln | Noreste de México",
  description:
    "Grupo CAR. Distribuidores autorizados Ford, Mazda, Volvo y Lincoln en Nuevo León, Coahuila, Tamaulipas y Chihuahua. Experiencia automotriz premium en el noreste de México.",
  keywords: [
    "Grupo Car",
    "Ford México",
    "Mazda México",
    "Volvo México",
    "Lincoln México",
    "Lincoln Saltillo",
    "Agencia de autos Monterrey",
    "Agencia de autos Saltillo",
    "Distribuidor Volvo Valle Oriente",
  ],
  openGraph: {
    title: "Grupo CAR — Ford · Mazda · Volvo · Lincoln",
    description:
      "Grupo automotriz con presencia en Nuevo León, Coahuila, Tamaulipas y Chihuahua.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
