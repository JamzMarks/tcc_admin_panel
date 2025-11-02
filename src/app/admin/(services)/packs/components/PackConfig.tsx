"use client";

import { useState } from "react";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


interface PackConfigProps {
  name: string;
  cicle: number;
  onNameChange: (value: string) => void;
  onCicleChange: (value: number) => void;
}

export const PackConfig = ({name, cicle, onNameChange, onCicleChange}: PackConfigProps) => {
  const [maxTime, setMaxTime] = useState<number | "">(60);
  const [cycleTime, setCycleTime] = useState<number | "">(120);

  const handleSave = () => {
    console.log("Pack Configs:", { maxTime, cycleTime });
    // Aqui você pode enviar para a API depois
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="maxTime">Nome do Pack</Label>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ex: Pack Principal"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cycleTime">Tempo de ciclo total (segundos)</Label>
          <Input
            type="number"
            value={cicle}
            onChange={(e) => onCicleChange(Number(e.target.value))}
            placeholder="0"
          />
        </div>

        <Button onClick={handleSave} className="text-gray-200">Salvar Configurações</Button>
      </div>
    </>
  );
};
