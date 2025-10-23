"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { selectedItem } from "../GraphRender2";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { GraphClient } from "@/services/graphService.service";
import { RequestModal } from "@/components/ui/modal/RequestModal";

interface NodeMenuProps {
  selectedItem: selectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<selectedItem | null>>;
}

// Componente recursivo para renderizar dados
const DataRenderer = ({ data }: { data: any }) => {
  if (data == null) return <p className="text-gray-400 italic">nulo</p>;

  if (typeof data !== "object") {
    return <span className="text-blue-600">{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <ul className="ml-4 list-disc space-y-1">
        {data.map((item, i) => (
          <li key={i}>
            <DataRenderer data={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="ml-2 border-l pl-2 space-y-1">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="flex flex-col text-lg">
          <span className="font-medium text-gray-700">{key}:</span>
          <div className="ml-3">
            <DataRenderer data={value} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const NodeMenu = ({ selectedItem, setSelectedItem }: NodeMenuProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [semaforoFormOpen, setSemaforoFormOpen] = useState<boolean>(false);

  return (
    <>
      <Sheet
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle>
              {selectedItem?.type === "node"
                ? "Nó Selecionado"
                : "Aresta Selecionada"}
            </SheetTitle>
          </SheetHeader>

          <div className="p-4 overflow-y-auto h-full text-md">
            {selectedItem ? (
              <DataRenderer data={selectedItem.data} />
            ) : (
              <p className="text-gray-400 text-md italic">
                Nenhum item selecionado
              </p>
            )}
          </div>
          <div>
            <Button
              className="bg-primary outline-0 m-4 cursor-pointer hover:bg-orange-600"
              onClick={() => setModalOpen(true)}
            >
              ClearWayNode
            </Button>
            <Button
              className="bg-primary outline-0 m-4 cursor-pointer hover:bg-orange-600"
              onClick={() => setSemaforoFormOpen(true)}
            >
              Vincular Semáforo
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <RequestModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Limpar Way Node"
        message={`Deseja realmente limpar o Way?`}
        asyncAction={async () => {
          const wayId = selectedItem?.data.tags.wayProps.wayId;
          return await GraphClient.ClearWayNode(wayId);
        }}
        onSuccess={() => console.log("Way Node limpo com sucesso!")}
        onError={(err) => console.error("Erro ao limpar Way Node:", err)}
      />
    </>
  );
};
