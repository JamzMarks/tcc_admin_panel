"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { GraphClient } from "@/services/graphService.service";
import { RequestModal } from "@/components/ui/modal/RequestModal";
import { SemaforoFormModal } from "./SemaforoFormModal";
import { SelectedItem } from "../GraphWrapper";
import { DeviceFormModal } from "./DeviceFormModal";

interface NodeMenuProps {
  selectedItem: SelectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem | null>>;
}

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
  const [semaforoFormOpen, setSemaforoFormOpen] = useState(false);
  const [deviceFormModal, setDeviceFormModal] = useState(false);

  if (!selectedItem) return null;

  return (
    <>
      <Sheet
        open={!!selectedItem}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle>
              {selectedItem.type === "node"
                ? "Nó Selecionado"
                : "Aresta Selecionada"}
            </SheetTitle>
            <SheetDescription>Detalhes do nó.</SheetDescription>
          </SheetHeader>

          <div className="p-4 overflow-y-auto h-full text-md">
            <DataRenderer data={selectedItem.data} />
          </div>

          <div className="border-t p-4 flex gap-2">

            <Button
              className="bg-primary outline-0 cursor-pointer hover:bg-orange-600"
              onClick={() => setSemaforoFormOpen(true)}
            >
              Vincular Semáforo
            </Button>
            <Button
              className="bg-primary outline-0 cursor-pointer hover:bg-orange-600"
              onClick={() => setDeviceFormModal(true)}
            >
              Vincular Dispositivo
            </Button>
          </div>
        </SheetContent>
      </Sheet>


      <DeviceFormModal
        open={deviceFormModal}
        onOpenChange={setDeviceFormModal}
        ways={selectedItem.data.tags.ways}
        nodeId={selectedItem.data.tags.nodeId!}
      />

      <SemaforoFormModal
        open={semaforoFormOpen}
        onOpenChange={setSemaforoFormOpen}
        ways={selectedItem.data.tags.ways}
        nodeId={selectedItem.data.tags.nodeId!}
      />
    </>
  );
};
