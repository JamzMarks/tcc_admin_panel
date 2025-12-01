"use client";

import React, { useState } from "react";
import { DndContext, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { CheckCircle, CirclePlus } from "lucide-react";
import { MiniDraggable } from "../dragAndDrop/miniDraggable";

interface SubPack {
  id: string;
  name: string;
  semaforos: SemaforoDto[];
}

interface PackPanelProps {
  semaforos: SemaforoDto[];
  onConfirm?: (looseSemaforos: SemaforoDto[], subPacks: SubPack[]) => void;
}

export const PackPanel = ({ semaforos, onConfirm }: PackPanelProps) => {
  const [availableSemaforos, setAvailableSemaforos] = useState<SemaforoDto[]>(semaforos);
  const [looseSemaforos, setLooseSemaforos] = useState<SemaforoDto[]>([]);
  const [subPacks, setSubPacks] = useState<SubPack[]>([]);

  // Criar novo SubPack
  const createSubPack = () => {
    const newSubPack: SubPack = {
      id: Date.now().toString(),
      name: `SubPack ${subPacks.length + 1}`,
      semaforos: [],
    };
    setSubPacks(prev => [...prev, newSubPack]);
  };

  // Função para mover semáforo para looseSemaforos
  const addToLoose = (id: string) => {
    const sem = availableSemaforos.find(s => s.id === id);
    if (!sem) return;
    setLooseSemaforos(prev => [...prev, sem]);
    setAvailableSemaforos(prev => prev.filter(s => s.id !== id));
  };

  // Função para mover semáforo para SubPack
  const addToSubPack = (subPackId: string, semaforoId: string) => {
    const sem = availableSemaforos.find(s => s.id === semaforoId);
    if (!sem) return;
    setSubPacks(prev =>
      prev.map(sp =>
        sp.id === subPackId ? { ...sp, semaforos: [...sp.semaforos, sem] } : sp
      )
    );
    setAvailableSemaforos(prev => prev.filter(s => s.id !== semaforoId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (overId === "loose-dropzone") {
      addToLoose(activeId);
    }

    const spId = subPacks.find(sp => sp.id.toString() === overId)?.id;
    if (spId) {
      addToSubPack(spId, activeId);
    }
  };

  const SubPackCard = ({ subPack }: { subPack: SubPack }) => {
    const { setNodeRef } = useDroppable({ id: subPack.id.toString() });
    return (
      <div ref={setNodeRef} className="border rounded-lg p-2 w-60 flex flex-col gap-2 bg-white dark:bg-neutral-900 shadow">
        <h4 className="font-semibold">{subPack.name}</h4>
        <div className="flex flex-wrap gap-2">
          {subPack.semaforos.map(s => (
            <MiniDraggable key={s.id} semaforo={s} />
          ))}
          {subPack.semaforos.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Arraste semáforos aqui</p>
          )}
        </div>
      </div>
    );
  };

  const LooseDropZone = () => {
    const { setNodeRef } = useDroppable({ id: "loose-dropzone" });
    return (
      <div
        ref={setNodeRef}
        className="min-h-[120px] border-2 border-dashed rounded-lg p-2 flex flex-wrap gap-2 bg-gray-50 dark:bg-neutral-800"
      >
        {looseSemaforos.map(s => <MiniDraggable key={s.id} semaforo={s} />)}
        {looseSemaforos.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Arraste os semáforos aqui ou crie subpacks
          </p>
        )}
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 w-full">
        {/* Disponíveis */}
        <div className="w-1/4 p-2 border-r border-gray-200 dark:border-neutral-700">
          <h2 className="font-bold mb-2">Semáforos disponíveis</h2>
          <div className="flex flex-col gap-2">
            {availableSemaforos.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">Nenhum semáforo disponível</p>
            ) : (
              availableSemaforos.map(s => <MiniDraggable key={s.id} semaforo={s} />)
            )}
          </div>
        </div>

        {/* Organização */}
        <div className="w-3/4 p-2 flex flex-col gap-4">
          <h2 className="font-bold mb-2">Organização do Pack</h2>
          <LooseDropZone />
          <div className="flex gap-4 flex-wrap">
            {subPacks.map(sp => <SubPackCard key={sp.id} subPack={sp} />)}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={createSubPack} variant="outline" className="flex items-center gap-2">
              <CirclePlus /> Criar SubPack
            </Button>
            <Button
              onClick={() => onConfirm?.(looseSemaforos, subPacks)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <CheckCircle /> Confirmar
            </Button>
          </div>
        </div>
      </div>
    </DndContext>
  );
};
