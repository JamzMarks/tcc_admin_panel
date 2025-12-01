"use client";

import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw, CheckCircle, Loader2 } from "lucide-react";
import { DevicesClient } from "@/services/devices.service";
import { SemaforoCard } from "../cards/SemaforoCard";

interface SemaforoPanelProps {
  handleRefresh: (selected: SemaforoDto[]) => void;
  onConfirm: (selected: SemaforoDto[]) => void;
}

export const SemaforoPanel = ({ handleRefresh, onConfirm }: SemaforoPanelProps) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<SemaforoDto[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [semaforos, setSemaforos] = useState<SemaforoDto[]>([]);
  const [loading, setLoading] = useState(false);

  // Buscar semáforos
  useEffect(() => {
    const fetchSemaforos = async () => {
      if (search.trim().length < 2) {
        setSemaforos([]);
        return;
      }

      try {
        setLoading(true);
        const res = await DevicesClient.GetTrafficLight({
          query: search,
          isActive: null,
          pack: null,
          subPack: null,
        });
        setSemaforos(res.data || []);
      } catch (error) {
        console.error("Erro ao buscar semáforos:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSemaforos, 400);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const filtered = semaforos.filter(
    (s) => !selected.some((sel) => sel.id === s.id)
  );

  const handleSelect = (semaforo: SemaforoDto) => {
    setSelected((prev) => [...prev, semaforo]);
    setSearch("");
    setShowDropdown(false);
  };

  const removeFromSelected = (id?: string) => {
    if (!id) return;
    setSelected((prev) => prev.filter((s) => s.id !== id));
  };

  const handleConfirmClick = () => {
    onConfirm(selected); // envia semáforos selecionados para o step
  };

  const handleRefreshClick = () => {
    handleRefresh(selected);
  };

  return (
    <div className="relative p-4 bg-background rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 dark:bg-foreground-dark">
      {/* Input de busca */}
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Buscar semáforo..."
          className="w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(e.target.value.length > 0);
          }}
          onFocus={() => setShowDropdown(search.length > 0)}
        />

        {showDropdown && (
          <ul className="absolute z-20 bg-white dark:bg-neutral-900 border dark:border-neutral-700 rounded-lg shadow-md mt-1 w-full max-h-64 overflow-auto">
            {loading ? (
              <li className="px-3 py-2 flex items-center justify-center text-gray-500 dark:text-gray-300">
                <Loader2 className="w-5 h-5 animate-spin mr-2" /> Buscando...
              </li>
            ) : filtered.length > 0 ? (
              filtered.map((s) => (
                <li
                  key={s.id}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer rounded transition-colors"
                  onClick={() => handleSelect(s)}
                >
                  {s.deviceId} — {s.macAddress}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 dark:text-gray-400 italic">
                Nenhum resultado encontrado
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Semáforos selecionados */}
      <h4 className="font-semibold mb-2">Selecionados</h4>
      <div className="flex flex-wrap gap-3 min-h-[60px]">
        {selected.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Busque e selecione os semáforos para este pack
          </p>
        ) : (
          selected.map((s) => (
            <SemaforoCard
              key={s.id}
              semaforo={s}
              onRemove={removeFromSelected}
            />
          ))
        )}
      </div>

      {/* Ações */}
      <div className="mt-6 flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={handleRefreshClick}
          className="flex items-center gap-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Refresh
        </Button>

        <Button
          onClick={handleConfirmClick}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Confirmar
        </Button>
      </div>
    </div>
  );
};
