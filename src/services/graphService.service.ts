
import { apiFetch } from "@/lib/api/client";
import { Graph, WayWithNodes } from "@/types/graph/graph.type";
import { LinkSemaforo } from "@/types/graph/linkGraph.type";

class GraphService {

  constructor() {}

  public async GetGraphMap(): Promise<Graph>{
    return await apiFetch('/dv/graph/export/json', {
      method: "GET"
    });
  }

  public async GetGraphWayMap(): Promise<WayWithNodes>{
    return await apiFetch('/dv/graph/full-graph', {
      method: "GET"
    });
  }

  public async GetGraphWays(): Promise<Graph>{
    return await apiFetch('/dv/graph/ways', {
      method: "GET"
    });
  }

  public async ClearWayNode(wayId: string): Promise<Graph>{
    return await apiFetch(`/dv/graph/clear/${wayId}`, {
      method: "POST"
    });
  }
  public async GetNodeSiblings(nodeId: string): Promise<any>{
    return await apiFetch(`/dv/graph/${nodeId}/siblings`, {
      method: "GET"
    });
  }
  


}

export const GraphClient = new GraphService();
