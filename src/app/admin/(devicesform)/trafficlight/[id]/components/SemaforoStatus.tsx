"use client";

import { useEffect, useState } from "react";
import { CommandMessage } from "@/types/devices/semaforo/command.type";
import { calculateSemaforoStatus } from "@/utils/semaforo/semaforoStatus";

interface SemaforoStatusProps {
  status: CommandMessage | null;
}

export const SemaforoStatus = ({ status }: SemaforoStatusProps) => {
  const [light, setLight] = useState<"red" | "yellow" | "green" | "off">("off");
  const [fade, setFade] = useState(1); // valor de 0 a 1 controla a suavização

  useEffect(() => {
    if (!status) {
      setLight("off");
      return;
    }

    const update = () => {
      const newLight = calculateSemaforoStatus(status.command);

      // lógica para calcular quanto falta do verde
      const { green_start, green_duration, cycle_total } = status.command;

      const tm = new Date();
      const pos =
        (tm.getHours() * 3600 +
          tm.getMinutes() * 60 +
          tm.getSeconds()) %
        cycle_total;

      const greenEnd = (green_start + green_duration) % cycle_total;

      const remainingGreen =
        greenEnd >= pos
          ? greenEnd - pos
          : cycle_total - pos + greenEnd;

      // suavização no final do verde
      if (remainingGreen <= 3 && newLight === "green") {
        setFade(remainingGreen / 3); // 3 → 1, 0 → 0
      } else {
        setFade(1); // normal
      }

      setLight(newLight);
    };

    update();
    const interval = setInterval(update, 500);

    return () => clearInterval(interval);
  }, [status]);

  const styleGreen = {
    opacity: light === "green" ? fade : 0.3,
    transition: "opacity 0.4s linear",
  };

  const styleYellow = {
    opacity:
      light === "yellow"
        ? 1
        : fade < 1 && light === "green"
        ? 1 - fade // amarelo começa a aparecer
        : 0.3,
    transition: "opacity 0.4s linear",
  };

  const styleRed = {
    opacity: light === "red" ? 1 : 0.3,
    transition: "opacity 0.4s linear",
  };

  return (
    <div>
      <div className="flex flex-col items-center bg-black p-6 rounded-xl w-28 mx-auto gap-0.5">
        <div className="w-12 h-12 rounded-full bg-red-500" style={styleRed} />
        <div className="w-12 h-12 rounded-full bg-yellow-400" style={styleYellow} />
        <div className="w-12 h-12 rounded-full bg-green-500" style={styleGreen} />
      </div>

      <p className="text-center mt-2 font-medium text-sm text-muted-foreground">
        Status atual:{" "}
        <span className="capitalize font-semibold">
          {light === "off" ? "sem comando" : light}
        </span>
      </p>

      {status && (
        <p className="text-center text-xs text-muted-foreground mt-1">
          Ciclo: {status.command.cycle_total}s — Início:{" "}
          {status.command.green_start}s — Duração:{" "}
          {status.command.green_duration}s
        </p>
      )}
    </div>
  );
};
