import * as React from "react";
import "../styles.css";

/**
 * Superficie de marca: define el contexto de color de todo lo que contiene.
 * - "dark"     → azul noche plano (el default de la marca)
 * - "gradient" → degradado de marca (navy → azul → azul REVO)
 * - "night"    → degradado nocturno (portadas, máximo dramatismo)
 * - "light"    → el "momento claro": blanco con tinta (interiores densos,
 *                piezas económicas de imprimir)
 * En papel: dark/gradient/night = plantilla oscura; light = plantilla clara.
 */
export interface SurfaceProps {
  variant?: "dark" | "gradient" | "night" | "light";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Surface({ variant = "dark", children, style }: SurfaceProps) {
  const cls =
    variant === "light"
      ? "rv-surface rv-on-light"
      : variant === "gradient"
        ? "rv-surface rv-surface--gradient"
        : variant === "night"
          ? "rv-surface rv-surface--night"
          : "rv-surface";
  return (
    <section className={cls} style={style}>
      {children}
    </section>
  );
}
