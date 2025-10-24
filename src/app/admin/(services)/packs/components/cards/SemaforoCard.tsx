
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import React from "react";


interface SemaforoCardProps {
  semaforo: SemaforoDto;
  onRemove?: (id?: number) => void;
}

const SemaforoCard: React.FC<SemaforoCardProps> = ({ semaforo, onRemove }) => {
  return (
    <div className="bg-white border rounded shadow p-4 w-60 flex flex-col justify-between">
      <div className="mb-2">
        <h3 className="font-bold text-gray-800">{semaforo.deviceId}</h3>
        <p className="text-sm text-gray-500">MAC: {semaforo.macAddress}</p>
        <p className="text-sm text-gray-500">IP: {semaforo.ip}</p>
        <p className="text-sm text-gray-500">Status: {semaforo.isActive ? "Ativo" : "Inativo"}</p>
      </div>
      {onRemove && (
        <button
          onClick={() => onRemove(semaforo.id)}
          className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remover
        </button>
      )}
    </div>
  );
};

export default SemaforoCard;
