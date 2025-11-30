import { CommandMessage } from "@/types/devices/semaforo/command.type";

export function calculateSemaforoStatus(
  command: CommandMessage["command"],
  now: Date
) {
  const { cycle_total, green_start: gs, green_duration: gd } = command;

  const yellow_dur = 3;

  // segundos desde meia-noite
  const secondsSinceMidnight =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  // posição dentro do ciclo
  const pos = secondsSinceMidnight % cycle_total;

  // MESMA LÓGICA DO ESP32
  const green_end = (gs + gd - yellow_dur + cycle_total) % cycle_total;
  const yellow_end = (gs + gd) % cycle_total;

  // ---- GREEN interval ----
  let isGreen = false;
  if (gs <= green_end) {
    isGreen = pos >= gs && pos < green_end;
  } else {
    isGreen = pos >= gs || pos < green_end;
  }

  if (isGreen) return "green";

  // ---- YELLOW interval ----
  let isYellow = false;
  if (green_end <= yellow_end) {
    isYellow = pos >= green_end && pos < yellow_end;
  } else {
    isYellow = pos >= green_end || pos < yellow_end;
  }

  if (isYellow) return "yellow";

  // ---- RED interval ----
  return "red";
}
