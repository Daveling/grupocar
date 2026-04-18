import type { ImgHTMLAttributes, SVGProps } from "react";

/**
 * Grupo CAR — official brand mark (image-based).
 * Accepts SVGProps for signature compatibility; only className is used.
 */
export function GrupoCarMark({ className = "" }: SVGProps<SVGSVGElement>) {
  return (
    <img
      src="/logos/grupo_car_logo.jpeg"
      alt="Grupo CAR"
      className={`object-contain ${className}`}
    />
  );
}

/**
 * Grupo CAR — full lockup with mark + wordmark.
 */
export function GrupoCarLockup({
  className = "",
  markColor = "text-gold-300",
}: {
  className?: string;
  markColor?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <GrupoCarMark className={`h-7 w-7 ${markColor}`} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-semibold tracking-[0.24em]">
          GRUPO CAR
        </span>
      </span>
    </span>
  );
}

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;

export function FordMark({ className = "", ...props }: ImgProps) {
  return (
    <img
      src="/logos/ford_logo_icon_169155.png"
      alt="Ford"
      className={`object-contain ${className}`}
      {...props}
    />
  );
}

export function MazdaMark({ className = "", ...props }: ImgProps) {
  return (
    <img
      src="/logos/Mazda_logo.png"
      alt="Mazda"
      className={`object-contain ${className}`}
      {...props}
    />
  );
}

export function VolvoMark({ className = "", ...props }: ImgProps) {
  return (
    <img
      src="/logos/Volvo-Logo-1930.png"
      alt="Volvo"
      className={`object-contain brightness-0 invert ${className}`}
      {...props}
    />
  );
}

export function LincolnMark({ className = "", ...props }: ImgProps) {
  return (
    <img
      src="/logos/logo-Lincoln.png"
      alt="Lincoln"
      className={`object-contain brightness-0 invert ${className}`}
      {...props}
    />
  );
}

/** Small inline selector by brand key. */
export function BrandLockup({
  brand,
  className,
}: {
  brand: "ford" | "mazda" | "volvo" | "lincoln";
  className?: string;
}) {
  const common = className ?? "h-7 w-auto text-current";
  if (brand === "ford") return <FordMark className={common} />;
  if (brand === "mazda") return <MazdaMark className={common} />;
  if (brand === "lincoln") return <LincolnMark className={common} />;
  return <VolvoMark className={common} />;
}
