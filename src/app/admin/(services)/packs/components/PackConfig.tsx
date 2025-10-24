"use client";

import { useState } from "react";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const PackConfig = () => {
  const [maxTime, setMaxTime] = useState<number | "">(60);
  const [cycleTime, setCycleTime] = useState<number | "">(120);

  const handleSave = () => {
    console.log("Pack Configs:", { maxTime, cycleTime });
    // Aqui você pode enviar para a API depois
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="maxTime">Tempo máximo do pacote (segundos)</Label>
          <Input
            id="maxTime"
            type="number"
            value={maxTime}
            onChange={(e) =>
              setMaxTime(e.target.value === "" ? "" : parseInt(e.target.value))
            }
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="cycleTime">Tempo de ciclo total (segundos)</Label>
          <Input
            id="cycleTime"
            type="number"
            value={cycleTime}
            onChange={(e) =>
              setCycleTime(
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
          />
        </div>

        <Button onClick={handleSave}>Salvar Configurações</Button>
      </div>
    </>
  );
};
