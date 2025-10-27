"use client";
import { useState } from "react";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { PackPanel } from "./PackPanel";
import { PackConfig } from "../PackConfig";
import { SemaforoPanel } from "./SemaforosPanel";
import { CreatePackDto } from "@/types/pack/pack.dto";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import HttpModal from "@/components/ui/modal/HttpModal";
import { PackClient } from "@/services/pack.service";
import { Button } from "@/components/ui/button";

export const PannelWrapper = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{ message: string; type?: 'error' | 'success' | 'confirm'; onConfirm?: () => void }>({ message: '' });

  const [packData, setPackData] = useState<CreatePackDto>({
    name: "",
    configs: { cicle: 0 },
    semaforos: [],
    subPacks: [],
  });

  function handleConfirm(semaforos: SemaforoDto[]) {
    setPackData((prev) => ({
      ...prev,
      semaforos: [...semaforos],
    }));
  }

  function handleRefresh(semaforos: SemaforoDto[]) {
    const combined = [...packData.semaforos, ...semaforos];
    const uniqueSemaforos = combined.filter(
      (s, index, self) => self.findIndex((t) => t.id === s.id) === index
    );
    setPackData((prev) => ({
      ...prev,
      semaforos: [...uniqueSemaforos],
    }));
  }

  const updatePackConfig = (field: string, value: any) => {
    setPackData((prev) => ({
      ...prev,
      configs: { ...prev.configs, [field]: value },
    }));
  };

  const updatePackName = (value: string) => {
    setPackData((prev) => ({ ...prev, name: value }));
  };

  const updateSemaforos = (semaforos: SemaforoDto[]) => {
    setPackData((prev) => ({ ...prev, semaforos }));
  };

  const handleCreate = async (data: CreatePackDto) => {
    try {
      await PackClient.CreatePack(data);
        setModalConfig({ message: 'Operação realizada com sucesso!', type: 'success' });
        setModalOpen(true);
    } catch (error: any) {
        setModalConfig({ message: error.message || 'Erro inesperado', type: 'error' });
        setModalOpen(true);
    }
  }


  return (
    <div className="space-y-4">
      <SectionWithHeader title="Semaforos picking">
        <SemaforoPanel
          onConfirm={handleConfirm}
          handleRefresh={handleRefresh}
        />
      </SectionWithHeader>

      <SectionWithHeader title="Pack Panel">
        <div className="w-full flex gap-4">
          <PackPanel 
            semaforos={packData.semaforos}
          />
        </div>
      </SectionWithHeader>

      <SectionWithHeader title="Pack Config">
        <PackConfig
          name={packData.name}
          cicle={packData.configs.cicle}
          onNameChange={updatePackName}
          onCicleChange={(value) => updatePackConfig("cicle", value)}
        />
      </SectionWithHeader>
      <Button
        onClick={() => handleCreate(packData)}
      >
        Confirmar criacao de Pacote
      </Button>
      <HttpModal
        isOpen={modalOpen}
        message={modalConfig.message}
        type={modalConfig.type}
        onClose={() => setModalOpen(false)}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
};
