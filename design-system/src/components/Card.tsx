import * as React from "react";
import "../styles.css";

/**
 * Tarjeta: el panel de contenido de la marca.
 * - "glass" → cristal translúcido sobre fondo azul (SOLO pantalla)
 * - "solid" → panel navy-850 opaco: es la traducción del cristal para papel
 *             y para contextos sin desenfoque
 * Sobre superficie clara (rv-on-light) la tarjeta se vuelve blanca con filo de tinta.
 * Siempre lleva un filo perimetral finísimo; en papel, 0,3pt.
 */
export interface CardProps {
  variant?: "glass" | "solid";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ variant = "glass", children, style }: CardProps) {
  const cls = variant === "solid" ? "rv-card rv-card--solid" : "rv-card";
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
