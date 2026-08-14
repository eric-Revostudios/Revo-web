import * as React from "react";
import "../styles.css";

/**
 * Marcas de visor: escuadras de 1px en las esquinas de un marco. Evocan la mira
 * de un instrumento de medición — el gesto "técnico-médico" de la marca.
 * Envuelve una imagen, una ficha de datos o una sección destacada.
 * En papel: escuadras de 3–4mm con trazo de 0,3–0,5pt.
 */
export function CornerFrame({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="rv-frame" style={style}>
      <span className="rv-frame__tick rv-frame__tick--tl" aria-hidden="true" />
      <span className="rv-frame__tick rv-frame__tick--tr" aria-hidden="true" />
      <span className="rv-frame__tick rv-frame__tick--bl" aria-hidden="true" />
      <span className="rv-frame__tick rv-frame__tick--br" aria-hidden="true" />
      {children}
    </div>
  );
}
