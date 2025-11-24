import { CommandMessage } from "@/types/devices/semaforo/command.type";

export function calculateSemaforoStatus(command: CommandMessage["command"]) {
  const { cycle_total, green_start, green_duration } = command;

  const tm = new Date();
  const secondsSinceMidnight =
    tm.getHours() * 3600 + tm.getMinutes() * 60 + tm.getSeconds();

  const position = Math.floor(secondsSinceMidnight % cycle_total);

  const greenEnd = (green_start + green_duration) % cycle_total;

  let isGreen = false;

  if (green_start < greenEnd) {
    isGreen = position >= green_start && position < greenEnd;
  } else {
    isGreen = position >= green_start || position < greenEnd;
  }

  const yellowDuration = 3;
  const yellowStart = (greenEnd - yellowDuration + cycle_total) % cycle_total;

  let isYellow = false;

  if (yellowStart < greenEnd) {
    isYellow = position >= yellowStart && position < greenEnd;
  } else {
    isYellow = position >= yellowStart || position < greenEnd;
  }

  if (isGreen) return "green";
  if (isYellow) return "yellow";
  return "red";
}
