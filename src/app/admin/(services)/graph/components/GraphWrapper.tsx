"use client";
import { useEffect, useState } from "react";
import { GraphFilters } from "./modal/GraphFilter";
import { NodePanelWrapper } from "./NodePanelWrapper";
import GraphRender from "./GraphRender";
import { GraphClient } from "@/services/graphService.service";
import { Graph as GraphType, WayWithNodes } from "@/types/graph/graph.type";
import GraphRender2 from "./GraphRender2";
export type selectedItem = {
  type: "node" | "edge";
  data: unknown;
};

export const GraphWrapper = () => {
    const [selectedItem, setSelectedItem] = useState<null | selectedItem>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // const [graphData, setGraphData] = useState<GraphType>({
    //   nodes: [],
    //   relationships: [],
    // });

    const [graphData, setGraphData] = useState<WayWithNodes>({
      nodes: [],
      relationships: [],
    });
    
  // useEffect(() => {
  //     async function getMap(): Promise<void> {
  //       try {
  //         const data = await GraphClient.GetGraphMap();
  //         setGraphData(data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //     getMap();
  //   }, []);

     useEffect(() => {
      async function getMap(): Promise<void> {
        try {
          const data = await GraphClient.GetGraphWayMap();
          setGraphData(data);
        } catch (error) {
          console.log(error);
        }
      }
      getMap();
    }, []);
    
  return (
    <div>
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
      </div>
      {/* <GraphRender graphData={graphData} setSelectedItem={setSelectedItem} /> */}
      <GraphRender2  graphData={graphData} setSelectedItem={setSelectedItem}/>
    </div>
  );
};
