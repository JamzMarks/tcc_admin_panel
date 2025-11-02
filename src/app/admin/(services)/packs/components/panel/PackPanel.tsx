
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button } from "@/components/ui/button";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { MiniSemaforoCard, MiniSemaforoCardType } from "../cards/MiniSemaforoCard";
import { SubPack, SubPackCard } from "../cards/SubPackCard";
import { CheckCircle, CirclePlus } from "lucide-react";


interface PackPanelProps {
  semaforos: SemaforoDto[];
}

export const PackPanel = ({ semaforos }: PackPanelProps) => {
  const [availableSemaforos, setAvailableSemaforos] =
    useState<SemaforoDto[]>(semaforos);

  const [subPacks, setSubPacks] = useState<SubPackCard[]>([]);

  const handleDropSemaforo = (semaforo: MiniSemaforoCardType, subPackId: number) => {
    setSubPacks((prev) =>
      prev.map((sp) =>
        sp.id === subPackId
          ? { ...sp, semaforos: [...sp.semaforos, semaforo] }
          : sp
      )
    );
    setAvailableSemaforos((prev) => prev.filter((s) => s.id !== semaforo.id));
  };

  const createSubPack = () => {
    const newSubPack: SubPackCard = {
      id: Date.now(),
      name: `SubPack ${subPacks.length + 1}`,
      semaforos: [],
    };
    setSubPacks((prev) => [...prev, newSubPack]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 w-full">
        <div className="w-1/4 p-2 ">
          <h2 className="font-bold mb-2">Semáforos disponíveis</h2>
          {semaforos.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              Busque os semáforos do pacote
            </p>
          ) : (
            semaforos.map((s) => (
              <MiniSemaforoCard
                key={s.id}
                semaforo={{
                  deviceId: s.deviceId,
                  id: s.id,
                  isActive: s.isActive || false,
                }}
              />
            ))
          )}
        </div>

        <div className=" p-2 w-full">
          <h2 className="font-bold mb-2">Organização</h2>
          <div className="border rounded-2xl w-full flex wrap min-h-10">
            {subPacks.map((sp) => (
              <SubPack
                key={sp.id}
                subPack={sp}
                onDropSemaforo={handleDropSemaforo}
              />
            ))}
          </div>
          <div className="flex justify-end items-center">
            <Button className="m-4" onClick={createSubPack}>
              <CirclePlus />
              Criar SubPack
            </Button>
            <Button
              // onClick={handleConfirmClick} 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
