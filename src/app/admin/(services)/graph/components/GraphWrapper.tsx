"use client";

import { useEffect, useState } from "react";
import { GraphFilters } from "./modal/GraphFilter";
import { NodePanelWrapper } from "./NodePanelWrapper";
import { GraphClient } from "@/services/graphService.service";
import { WayWithNodes } from "@/types/graph/graph.type";
import GraphRender2 from "./GraphRender2";
import { GraphNodeAttributes } from "@/types/graph/sigmaGraph.type";

export type SelectedItem = {
  type: "node" | "edge";
  data: GraphNodeAttributes;
};

export const GraphWrapper = () => {
  const [selectedItem, setSelectedItem] = useState<null | SelectedItem>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [graphData, setGraphData] = useState<WayWithNodes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getMap(): Promise<void> {
      setIsLoading(true);
      setHasError(false);

      try {
        const data = await GraphClient.GetGraphWayMap();
        setGraphData(data);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMap();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Carregando grafo...
      </div>
    );
  }

  if (hasError || !graphData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p>Erro ao carregar o grafo.</p>
        <button
          onClick={() => location.reload()}
          className="mt-2 bg-red-600 text-white px-3 py-1 rounded shadow"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsFilterOpen(true)}
        className="absolute top-2 left-2 z-10 bg-blue-600 text-white px-3 py-1 rounded shadow"
      >
        Filtros
      </button>

      <GraphFilters
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <NodePanelWrapper
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <GraphRender2 graphData={graphData} setSelectedItem={setSelectedItem} />
    </div>
  );
};
