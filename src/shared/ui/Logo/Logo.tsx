import type { FC } from "react";

interface LogoProps {
  /** Size of the mark in pixels. */
  size?: number;
  /** Fill of the outer mark. */
  color?: string;
  /** Fill of the inner flower detail. */
  accent?: string;
  /** Show the "رگال" wordmark next to the symbol. */
  withWordmark?: boolean;
  className?: string;
}

/**
 * The Regal brand mark (a stylised "R" cradling a four-point bloom).
 * Rendered inline so it can be recoloured to any brand tone.
 */
const Logo: FC<LogoProps> = ({
  size = 36,
  color = "var(--brand-burgundy-deep)",
  accent = "var(--brand-pink-soft)",
  withWordmark = false,
  className,
}) => {
  const mark = (
    <svg
      width={size}
      height={size * (349 / 341)}
      viewBox="0 0 341 349"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={withWordmark ? true : undefined}
      role={withWordmark ? undefined : "img"}
    >
      <path
        d="M231.331 24C273.805 24.0001 308 69.2703 308 125.136C308 161.737 294.322 193.042 273.085 211.343L308 325H176.979L167.62 286.472C165.82 278.285 162.941 273.95 157.182 273.95C152.862 273.95 149.982 278.285 149.982 286.472L149.263 325H24V24H231.331ZM158 78C158 128.197 136.444 149 87 149C136.444 149 158 170.406 158 220C158 170.406 179.406 149 229 149C179.406 149 158 128.197 158 78Z"
        fill={color}
      />
      <path
        d="M158 78C158 128.197 136.444 149 87 149C136.444 149 158 170.406 158 220C158 170.406 179.406 149 229 149C179.406 149 158 128.197 158 78Z"
        fill={accent}
      />
    </svg>
  );

  if (!withWordmark) return <span className={className}>{mark}</span>;

  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}
    >
      {mark}
      <span
        style={{
          fontFamily: "bold",
          fontSize: `${size * 0.62}px`,
          color: "var(--brand-burgundy-deep)",
          letterSpacing: "0.5px",
        }}
      >
        Regal
      </span>
    </span>
  );
};

export default Logo;
