import * as React from "react";
import "../styles.css";

/**
 * Pasos numerados: la numeración editorial de la marca (01, 02, 03…).
 * Cifras en display grande, columnas separadas por filos finos. El paso
 * activo (si hay jerarquía) lleva la cifra en azul REVO.
 * Funciona idéntico en una sección web, la página de un folleto o un panel:
 * en papel las columnas se separan con filos de 0,3pt.
 */
export interface Step {
  /** Rótulo temporal opcional sobre el título ("Día 7", "Semana 2"). */
  when?: string;
  title: string;
  body: string;
}

export interface StepsProps {
  steps: Step[];
  /** Índice del paso destacado en azul (opcional). */
  active?: number;
}

export function Steps({ steps, active }: StepsProps) {
  return (
    <div className="rv-steps">
      {steps.map((s, i) => (
        <div className="rv-step" key={i}>
          <div className={i === active ? "rv-step__num rv-step__num--active" : "rv-step__num"}>
            {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="rv-step__title">
            {s.when && (
              <>
                <span className="rv-eyebrow" style={{ display: "block", marginBottom: 8 }}>{s.when}</span>
              </>
            )}
            {s.title}
          </h3>
          <div className="rv-step__body rv-body-soft">{s.body}</div>
        </div>
      ))}
    </div>
  );
}
