"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NodeDetails } from "./NodeDetails";
import { selectedItem } from "../GraphRender";
import { Dispatch, SetStateAction } from "react";


interface NodeMenuProps {
  selectedItem: selectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<selectedItem | null>>
}

export const NodeMenu = ({ selectedItem, setSelectedItem }: NodeMenuProps) => {
  return (
    <Sheet open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>
            {selectedItem?.type === "node" ? "Nó Selecionado" : "Aresta Selecionada"}
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 overflow-y-auto h-full">
            {JSON.stringify(selectedItem?.data, null, 2)}
          {/* {selectedItem ? (
            <NodeDetails selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum item selecionado</p>
          )} */}
        </div>
      </SheetContent>
    </Sheet>
  );
};
