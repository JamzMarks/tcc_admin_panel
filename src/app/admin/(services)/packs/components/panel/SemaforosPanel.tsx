// components/SemaforoPanel.tsx
"use client";

import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import React, { useState } from "react";
import SemaforoCard from "../cards/SemaforoCard";


// Mock de semáforos
const MOCK_SEMAFOROS: SemaforoDto[] = [
  { id: 1, deviceId: "TL-001", macAddress: "AA:BB:CC:01", ip: "192.168.0.1", deviceKey: "key1", isActive: true },
  { id: 2, deviceId: "TL-002", macAddress: "AA:BB:CC:02", ip: "192.168.0.2", deviceKey: "key2", isActive: false },
  { id: 3, deviceId: "TL-003", macAddress: "AA:BB:CC:03", ip: "192.168.0.3", deviceKey: "key3", isActive: true },
];

const SemaforoPanel: React.FC = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SemaforoDto[]>([]);
  const [selected, setSelected] = useState<SemaforoDto[]>([]);

  // Mock da request
  const handleSearch = () => {
    const filtered = MOCK_SEMAFOROS.filter(
      (s) =>
        s.deviceId.toLowerCase().includes(search.toLowerCase()) &&
        !selected.some(sel => sel.id === s.id) // remove duplicados
    );
    setResults(filtered);
  };

  const addToSelected = (semaforo: SemaforoDto) => {
    setSelected((prev) => [...prev, semaforo]);
    setResults((prev) => prev.filter((s) => s.id !== semaforo.id));
  };

  const removeFromSelected = (id?: number) => {
    if (!id) return;
    const removed = selected.find(s => s.id === id);
    setSelected((prev) => prev.filter(s => s.id !== id));
    if (removed) setResults((prev) => [...prev, removed]);
  };

  return (
    <div className="p-4 border rounded shadow bg-gray-50">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar semáforo..."
          className="border rounded px-2 py-1 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>

      <h4 className="font-semibold mb-2">Resultados</h4>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {results.map((s) => (
          <div key={s.id} onClick={() => addToSelected(s)}>
            <SemaforoCard semaforo={s} />
          </div>
        ))}
      </div>

      <h4 className="font-semibold mb-2">Selecionados</h4>
      <div className="grid grid-cols-3 gap-2">
        {selected.map((s) => (
          <SemaforoCard key={s.id} semaforo={s} onRemove={removeFromSelected} />
        ))}
      </div>
    </div>
  );
};

export default SemaforoPanel;
