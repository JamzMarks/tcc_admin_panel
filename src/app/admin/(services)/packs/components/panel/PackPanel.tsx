// PackPanel.tsx
import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { SemaforoCard, SubPackCard } from "./types";
export interface SemaforoCard {
  id: number;
  name: string;
}

export interface SubPackCard {
  id: number;
  name: string;
  semaforos: SemaforoCard[];
}
// Semáforo arrastável

const Semaforo = ({ semaforo }: { semaforo: SemaforoCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SEMAFORO",
    item: semaforo,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) drag(ref.current);
  }, [drag]);

  return (
    <Card
      ref={ref}
      className={`p-2 m-1 cursor-move ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <CardContent>{semaforo.name}</CardContent>
    </Card>
  );
};

// SubPack drop
const SubPack = ({
  subPack,
  onDropSemaforo,
}: {
  subPack: SubPackCard;
  onDropSemaforo: (semaforo: SemaforoCard, subPackId: number) => void;
}) => {
  const [, drop] = useDrop<SemaforoCard, void, unknown>({
    accept: "SEMAFORO",
    drop: (item) => onDropSemaforo(item, subPack.id),
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) drop(ref.current);
  }, [drop]);

  return (
    <Card ref={ref} className="p-2 m-2 border-2 border-dashed w-64 bg-gray-50">
      <CardContent>
        <h3 className="font-bold mb-2">{subPack.name}</h3>
        <div className="flex flex-wrap">
          {subPack.semaforos.map((s) => (
            <Semaforo key={s.id} semaforo={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// PackPanel principal
export const PackPanel = () => {
  const [availableSemaforos, setAvailableSemaforos] = useState<SemaforoCard[]>([
    { id: 1, name: "Semáforo 1" },
    { id: 2, name: "Semáforo 2" },
    { id: 3, name: "Semáforo 3" },
  ]);

  const [subPacks, setSubPacks] = useState<SubPackCard[]>([
    { id: 1, name: "SubPack A", semaforos: [] },
    { id: 2, name: "SubPack B", semaforos: [] },
  ]);

  const handleDropSemaforo = (semaforo: SemaforoCard, subPackId: number) => {
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
      <div className="flex gap-4">
        {/* Painel de semáforos disponíveis */}
        <div className="w-1/4 p-2 border rounded bg-gray-100">
          <h2 className="font-bold mb-2">Semáforos disponíveis</h2>
          {availableSemaforos.map((s) => (
            <Semaforo key={s.id} semaforo={s} />
          ))}
        </div>

        {/* Painel de subpacks */}
        <div className="w-3/4 p-2 border rounded bg-gray-50 flex flex-wrap">
          <Button className="m-2" onClick={createSubPack}>
            + Criar SubPack
          </Button>
          {subPacks.map((sp) => (
            <SubPack key={sp.id} subPack={sp} onDropSemaforo={handleDropSemaforo} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};
