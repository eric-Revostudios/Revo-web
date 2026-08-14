import * as React from "react";
import "../styles.css";

/**
 * Banda de datos: hechos cortos en serie, cada uno precedido por el punto
 * azul REVO ("Diez plazas · Inicio en octubre"). Vive al pie de un héroe,
 * bajo un titular o como franja informativa de un folleto.
 * En papel: misma serie con puntos plenos, o texto unido por separadores "·".
 */
export function FactBand({ facts }: { facts: string[] }) {
  return (
    <div className="rv-facts">
      {facts.map((f, i) => (
        <p className="rv-fact" key={i}>
          <span className="rv-fact__blip" aria-hidden="true" />
          {f}
        </p>
      ))}
    </div>
  );
}
