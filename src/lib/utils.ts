import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPriorityColor(p1: number, p2: number): string {
  const avg = (p1 + p2) / 2;

  if (avg <= 0.4) return "#bfbfbf";     // cinza
  if (avg <= 0.5) return "#2196F3";     // azul (nova faixa)
  if (avg <= 0.65) return "#4caf50";     // verde
  if (avg <= 0.75) return "#ffeb3b";    // amarelo (curta)
  if (avg <= 1) return "#ff5252";     // vermelho
  return "#b71c1c";                     // vermelho escuro
}

