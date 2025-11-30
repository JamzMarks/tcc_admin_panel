import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPriorityColor(p1: number, p2: number): string {
  const max = Math.max(p1, p2);

  if (max <= 0.2) return "#bfbfbf";        // cinza
  if (max <= 0.4) return "#4caf50";        // verde
  if (max <= 0.6) return "#ffeb3b";        // amarelo
  if (max <= 0.8) return "#ff5252";        // vermelho
  return "#b71c1c";                        // vermelho escuro
}
