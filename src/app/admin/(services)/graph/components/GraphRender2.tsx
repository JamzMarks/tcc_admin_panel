"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Graph as GraphType, WayWithNodes } from "@/types/graph/graph.type";
import Graph from "graphology";
import Sigma from "sigma";

export type selectedItem = {
  type: "node" | "edge";
  data: unknown;
};
interface GraphRenderProps {
  graphData: WayWithNodes;
  setSelectedItem: Dispatch<SetStateAction<selectedItem | null>>;
}

function getNodeColor(props: any): string {
  switch (true) {
    case props?.access === "private":
      return "green";
    case props?.highway === "service":
        return 'pink'
    

    case props?.type === "traffic_light":
      return "orange";

    case props?.highway === "residential":
      return "dodgerblue";

    case props?.highway === "primary":
      return "orange";

    case props?.highway === "secondary":
      return "orange";

    case props?.highway === "tertiary":
      return "orange";

    case props?.service === "parking_aisle":
      return "gray";

    case props?.name: // tem nome definido
      return "blue";

    
    default:
        if(props.name || props.destination){
            return "blue";
        }else if(/link/i.test(props.highway)){
            return "orange";
        }else{
            return "red"; // fallback padrão
        }
  }
}

const GraphRender = ({ graphData, setSelectedItem }: GraphRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sigmaRef = useRef<Sigma | null>(null);

  useEffect(() => {
    if (!graphData.nodes.length || !containerRef.current) return;

    const graph = new Graph();

    graphData.nodes.forEach((n) => {
      if (n.properties) {
        const wayId = n.properties.id?.low;
        const color = getNodeColor(n.properties);
        n.nodes.forEach((element) => {
          try {
            const nodeLabel = `${n.properties.highway}`;
            graph.addNode(element.id, {
              label:  nodeLabel,
              tags: {
                ...element.tags,
                wayId: wayId,
                wayProps: {
                  ...n.properties,
                },
              },
              size: 2,
              x: element.lon,
              y: element.lat,
              color,
            });
          } catch (error) {
          }
        });
      }
    });

    // Adicionar arestas
    graphData.relationships.forEach((r) => {
      if (r.type == "CONNECTED_TO") {
        try {
          graph.addEdge(r.startNodeId.toString(), r.endNodeId.toString(), {
            label: r.type,
            color: "gray",
          });
        } catch (error) {
        }
      }
    });

    // Se já existe Sigma, limpar
    if (sigmaRef.current) {
      sigmaRef.current.kill();
    }

    // Renderizar com Sigma
    sigmaRef.current = new Sigma(graph, containerRef.current);

    // LISTENERS
    sigmaRef.current.on("clickNode", (e) => {
      const node = graph.getNodeAttributes(e.node);
      setSelectedItem({ type: "node", data: node });
    });

    sigmaRef.current.on("clickEdge", (e) => {
      const edge = graph.getEdgeAttributes(e.edge);
      setSelectedItem({ type: "edge", data: edge });
    });

    sigmaRef.current.on("enterNode", (e) => {
      graph.setNodeAttribute(e.node, "size", 3);
    });

    sigmaRef.current.on("leaveNode", (e) => {
      graph.setNodeAttribute(e.node, "size", 2);
    });

    return () => {
      sigmaRef.current?.kill();
    };
  }, [graphData]);

  return (
    <div style={{ width: "100%", height: "800px" }} className="relative">
      <div style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
    </div>
  );
};

export default GraphRender;
