import * as React from "react";
import "../styles.css";

/**
 * Chip: dato corto en píldora con filo fino (una prueba médica, una terapia,
 * un atributo). Se usa en serie, en filas que envuelven.
 * En papel: píldora con trazo de 0,3pt, texto 7–8pt en mayúsculas.
 */
export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rv-chip">{children}</span>;
}
