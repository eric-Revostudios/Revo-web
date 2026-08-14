import * as React from "react";
import "../styles.css";

/**
 * Filo divisor: la línea finísima que ordena todo en la marca.
 * 1px en pantalla, 0,3pt en papel. Nunca bordes gruesos.
 */
export function Hairline({ style }: { style?: React.CSSProperties }) {
  return <hr className="rv-hairline" style={style} />;
}
