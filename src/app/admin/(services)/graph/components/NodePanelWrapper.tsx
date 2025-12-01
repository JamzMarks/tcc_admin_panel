"use client";

import { useEffect, SetStateAction, Dispatch } from "react";

import { NodeMenu } from "./modal/NodeMenu";
import { SelectedItem } from "./GraphWrapper";

export const NodePanelWrapper = ({
  selectedItem,
  setSelectedItem,
}: {
  selectedItem: SelectedItem | null;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem | null>>;
}) => {
  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(selectedItem);
    }
  }, [selectedItem]);

  return (
      <div className="w-full ">
        <NodeMenu
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
  );
};
