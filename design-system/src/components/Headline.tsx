import * as React from "react";
import "../styles.css";

/**
 * Titular display: Neue Haas Grotesk Display en peso ligero, tracking negativo,
 * con UNA palabra acentuada en serif itálica (el gesto humano de la marca).
 *
 *   <Headline size="lg" accent="mes.">El primer </Headline>
 *   → "El primer *mes.*"
 *
 * Tamaños: xl (portada/héroe) · lg (sección) · md (bloque/tarjeta).
 * En papel: 60–90pt / 30–44pt / 16–24pt.
 */
export interface HeadlineProps {
  size?: "xl" | "lg" | "md";
  /** Nivel semántico del encabezado (h1–h4). Default: h2. */
  as?: "h1" | "h2" | "h3" | "h4";
  /** La palabra (o palabras finales) en serif itálica. Una por titular. */
  accent?: string;
  children?: React.ReactNode;
}

export function Headline({ size = "lg", as = "h2", accent, children }: HeadlineProps) {
  const Tag = as;
  return (
    <Tag className={`rv-display rv-display--${size}`}>
      {children}
      {accent && <Ser>{accent}</Ser>}
    </Tag>
  );
}

/** Palabra en serif itálica dentro de un titular. Usar con moderación: una por titular. */
export function Ser({ children }: { children: React.ReactNode }) {
  return <span className="rv-ser">{children}</span>;
}
