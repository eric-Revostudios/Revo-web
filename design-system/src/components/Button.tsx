import * as React from "react";
import "../styles.css";

/**
 * Botón / llamada a la acción. Texto en MAYÚSCULAS con tracking .16em.
 * - "outline"  → píldora con filo fino (default)
 * - "primary"  → píldora rellena en azul REVO (la acción principal)
 * - "rect"     → rectángulo casi recto: la variante de máxima presencia (héroes)
 * En papel un botón es un rótulo: píldora o rectángulo con filo de 0,3pt
 * (o relleno azul REVO) y el mismo tratamiento tipográfico.
 */
export interface ButtonProps {
  variant?: "outline" | "primary" | "rect";
  size?: "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = "outline", size = "md", href, onClick, children }: ButtonProps) {
  const cls = [
    "rv-btn",
    variant === "primary" && "rv-btn--primary",
    variant === "rect" && "rv-btn--rect",
    size === "lg" && "rv-btn--lg",
  ]
    .filter(Boolean)
    .join(" ");
  return href ? (
    <a className={cls} href={href}>
      {children}
    </a>
  ) : (
    <button className={cls} type="button" onClick={onClick}>
      {children}
    </button>
  );
}
