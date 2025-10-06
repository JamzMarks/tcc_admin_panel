import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface GraphFiltersProps {
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export const GraphFilters = ({
  isFilterOpen,
  setIsFilterOpen,
}: GraphFiltersProps) => {
  return (
    <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        {/* Exemplo de filtros */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Tipo de nó</label>
          <select className="border p-2 rounded">
            <option value="all">Todos</option>
            <option value="traffic_light">Semáforos</option>
            <option value="street">Ruas</option>
          </select>

          <label className="text-sm">Status</label>
          <select className="border p-2 rounded">
            <option value="all">Todos</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
          </select>

          <button
            onClick={() => setIsFilterOpen(false)}
            className="bg-blue-600 text-white py-1 px-3 rounded mt-2"
          >
            Aplicar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
