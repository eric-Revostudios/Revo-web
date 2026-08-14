import * as React from "react";
import "../styles.css";

/**
 * Bloque de precio: la cifra en display con la periodicidad en pequeño,
 * y una nota en micro-etiqueta debajo ("Programa anual · Diez plazas").
 * La sobriedad es la regla: sin "¡oferta!", sin tachados, sin urgencia.
 */
export interface PriceProps {
  /** La cifra principal, p. ej. "12.000€". */
  amount: string;
  /** Lo que acompaña en pequeño, p. ej. "/ año · 1.000€ al mes". */
  per?: string;
  /** Nota bajo el precio, p. ej. "Programa anual · Diez plazas". */
  note?: string;
}

export function Price({ amount, per, note }: PriceProps) {
  return (
    <div>
      <p className="rv-price">
        {amount} {per && <small>{per}</small>}
      </p>
      {note && <p className="rv-price-note">{note}</p>}
    </div>
  );
}
