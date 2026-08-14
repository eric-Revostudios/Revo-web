import * as React from "react";
import "../styles.css";

/**
 * Micro-etiqueta ("eyebrow"): sitúa el tema antes del titular.
 * MAYÚSCULAS, tracking .18em, peso 600, opcionalmente precedida por el punto
 * azul REVO. Es el gesto más repetido de la marca.
 * En papel: 6,5–7,5pt, tracking +180; el punto va pleno, sin halo.
 */
export interface EyebrowProps {
  children: React.ReactNode;
  /** Punto azul REVO delante. Default: true. */
  dot?: boolean;
}

export function Eyebrow({ children, dot = true }: EyebrowProps) {
  return (
    <p className="rv-eyebrow">
      {dot && <span className="rv-eyebrow__dot" aria-hidden="true" />}
      {children}
    </p>
  );
}
