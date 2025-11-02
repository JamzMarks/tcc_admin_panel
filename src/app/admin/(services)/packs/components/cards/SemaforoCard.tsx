import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import React from "react";
import { Eye, Trash2 } from "lucide-react";

interface SemaforoCardProps {
  semaforo: SemaforoDto;
  onRemove?: (id?: number) => void;
  onView?: (semaforo: SemaforoDto) => void;
}

const SemaforoCard: React.FC<SemaforoCardProps> = ({ semaforo, onRemove, onView }) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 rounded-2xl shadow p-4 w-60 flex flex-col justify-between transition hover:shadow-md">
      <div className="mb-2">
        {/* Header: ID e Status */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">
            {semaforo.deviceId}
          </h3>
          <div className="flex items-center gap-1">
            <span
              className={`w-2.5 h-2.5 rounded-full shadow-md ${
                semaforo.isActive
                  ? "bg-green-500 shadow-green-500/50"
                  : "bg-red-500 shadow-red-500/50"
              }`}
              aria-label={semaforo.isActive ? "Semáforo ativo" : "Semáforo inativo"}
              role="status"
            />
            <span
              className={`text-xs font-medium ${
                semaforo.isActive
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              }`}
            >
              {semaforo.isActive ? "Ativo" : "Inativo"}
            </span>
          </div>
        </div>

        {/* MAC info */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          MAC: {semaforo.macAddress}
        </p>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-2 mt-4">
        {/* Botão Visualizar */}
        {onView && (
          <button
            onClick={() => onView(semaforo)}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
            aria-label="Visualizar informações do semáforo"
          >
            <Eye className="w-3.5 h-3.5" />
            Ver
          </button>
        )}

        {/* Botão Remover */}
        {onRemove && (
          <button
            onClick={() => onRemove(semaforo.id)}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 hover:bg-red-200 dark:hover:bg-red-800 transition"
            aria-label="Remover semáforo"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remover
          </button>
        )}
      </div>
    </div>
  );
};

export default SemaforoCard;
