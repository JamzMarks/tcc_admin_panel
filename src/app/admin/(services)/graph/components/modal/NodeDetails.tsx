import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { selectedItem } from "../GraphRender";

interface NodeDetails {
    selectedItem: selectedItem | null,
    setSelectedItem: Dispatch<SetStateAction<selectedItem | null>>
}

export const NodeDetails = ({selectedItem, setSelectedItem}: NodeDetails) => {
  return (
    <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedItem?.type === "node"
              ? "Detalhes do Nó"
              : "Detalhes da Aresta"}
          </DialogTitle>
        </DialogHeader>

        <pre className="bg-neutral-100 dark:bg-neutral-900 p-3 rounded text-sm max-h-[400px] overflow-auto">
          {JSON.stringify(selectedItem?.data, null, 2)}
        </pre>
      </DialogContent>
    </Dialog>
  );
};
