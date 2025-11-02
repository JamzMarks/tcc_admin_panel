"use client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  DevicesRelations,
  FNode,
  Way,
  WayWithNodes,
} from "@/types/graph/graph.type";
import Graph from "graphology";
import Sigma from "sigma";
import {
  GraphNodeAttributes,
  WayProperties,
} from "@/types/graph/sigmaGraph.type";
import { SelectedItem } from "./GraphWrapper";


interface GraphRenderProps {
  graphData: WayWithNodes;
  setSelectedItem: Dispatch<SetStateAction<SelectedItem | null>>;
}

function getNodeColor(props: any): string {
  switch (true) {
    case props?.highway === undefined:
      return "pink";
    case props?.highway === `service`:
      return "green";
    case props?.access === "private":
      return "green";

    default:
      if (props.name || props.destination) {
        return "orange";
      } else if (/link/i.test(props.highway)) {
        return "blue";
      } else {
        return "red";
      }
  }
}

const GraphRender = ({ graphData, setSelectedItem }: GraphRenderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sigmaRef = useRef<Sigma | null>(null);

  useEffect(() => {
    if (!graphData.nodes.length || !containerRef.current) return;

    const graph = new Graph();

    graphData.nodes.forEach((n: Way) => {
      if (!n.properties) return;

      const color = getNodeColor(n.properties);

      n.nodes.forEach((element: FNode) => {
        try {
          const nodeLabel = `${n.properties?.highway || ""}`;

          if (graph.hasNode(element.id)) {
            const existingNode = graph.getNodeAttributes(
              element.id
            ) as GraphNodeAttributes;
            const ways = existingNode.tags.ways || [];

            const wayExists = ways.some(
              (w: WayProperties) => w.wayId === n.properties!.wayId
            );
            const qtdWays = ways.length;

            if (!wayExists) {
              ways.push(n.properties as WayProperties);
              graph.mergeNodeAttributes(element.id, {
                tags: {
                  quantidadeWays: qtdWays + 1,
                  ...existingNode.tags,
                },
              });
            }
          } else {
            graph.addNode(element.id, {
              label: nodeLabel,
              tags: {
                ...element.tags,
                nodeId: element.id,
                ways: [n.properties],
              },
              size: 2,
              x: element.lon,
              y: element.lat,
              color,
            } as GraphNodeAttributes);
          }
        } catch (error) {
          console.error("Erro ao adicionar nó:", error);
        }
      });
    });
    const devicesRelations: DevicesRelations[] = [];
    graphData.relationships.forEach((r) => {
      switch (r.type) {
        case "CONNECTED_TO":
          try {
            graph.addEdge(r.startNodeId.toString(), r.endNodeId.toString(), {
              label: r.type,
              color: "gray",
            });
          } catch (error) {
            console.error("Erro ao adicionar edge CONNECTED_TO", error);
          }
          break;

        case "HAS_SEMAFORO":
        case "DEVICE_BETWEEN":
          devicesRelations.push(r as DevicesRelations);
          break;

        default:
          break;
      }
    });

    if (sigmaRef.current) {
      sigmaRef.current.kill();
    }

    sigmaRef.current = new Sigma(graph, containerRef.current);

    sigmaRef.current.on("clickNode", (e) => {
      const node = graph.getNodeAttributes(e.node) as GraphNodeAttributes;
      setSelectedItem({ type: "node", data: node });
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
    <div style={{ width: "100%", height: "70dvh" }} className="relative">
      <div style={{ width: "100%", height: "100%" }} ref={containerRef}></div>
    </div>
  );
};

export default GraphRender;
