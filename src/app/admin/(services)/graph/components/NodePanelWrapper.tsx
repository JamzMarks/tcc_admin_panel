"use client";

import { useEffect, SetStateAction, Dispatch } from "react";
import { selectedItem } from "./GraphRender2";
import { NodeMenu } from "./modal/NodeMenu";

export const NodePanelWrapper = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: selectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<selectedItem | null>>
}) => {

    useEffect(() => {
    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  }, [selectedItem]);

    return (
        <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white px-3 py-1 rounded shadow">
            <div className="w-full bg-amber-950">
            <div>
                <p>Open details</p>
                <button></button>
            </div>
            <NodeMenu
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            </div>
        </div>
    )
}