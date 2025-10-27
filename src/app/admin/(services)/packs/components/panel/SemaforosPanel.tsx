"use client";

import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import React, { useState, useEffect } from "react";
import SemaforoCard from "../cards/SemaforoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw, CheckCircle } from "lucide-react";
import { DevicesClient } from "@/services/devices.service";

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

    const delayDebounce = setTimeout(fetchSemaforos, 400); // debounce de 400ms
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

  const removeFromSelected = (id?: number) => {
    if (!id) return;
    setSelected((prev) => prev.filter((s) => s.id !== id));
  };

  const handleConfirmClick = () => {
    onConfirm(selected);
  };

  const handleRefreshClick = () => {
    handleRefresh(selected);
  };

  return (
    <div className="relative p-4">
      <div className="relative mb-4">
        <Input
          type="text"
          placeholder="Buscar semáforo..."
          className="border rounded px-3 py-2 w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(e.target.value.length > 0);
          }}
          onFocus={() => setShowDropdown(search.length > 0)}
        />

        {showDropdown && (
          <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full max-h-48 overflow-auto">
            {loading ? (
              <li className="px-3 py-2 text-gray-500 italic">Buscando...</li>
            ) : filtered.length > 0 ? (
              filtered.map((s) => (
                <li
                  key={s.id}
                  className="px-3 py-2 hover:bg-blue-100 cursor-pointer transition-colors"
                  onClick={() => handleSelect(s)}
                >
                  {s.deviceId} — {s.ip}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 italic">
                Nenhum resultado encontrado
              </li>
            )}
          </ul>
        )}
      </div>

      <h4 className="font-semibold mb-2">Selecionados</h4>
      <div className="flex flex-wrap gap-2">
        {selected.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">
            Busque os semáforos do pacote
          </p>
        ) : (
          selected.map((s) => (
            <SemaforoCard key={s.id} semaforo={s} onRemove={removeFromSelected} />
          ))
        )}
      </div>

      <div className="mt-6 flex gap-3">
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
