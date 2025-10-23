/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "@/lib/api/client";
import { Graph, WayWithNodes } from "@/types/graph/graph.type";
// import { ApiResponse } from "@/types/interfaces/apiResponse";
// import qs from "query-string";

class GraphService {

  constructor() {}

  public async GetGraphMap(): Promise<Graph>{
    return await apiFetch('dv/graph/export/json', {
      method: "GET"
    });
  }

  public async GetGraphWayMap(): Promise<WayWithNodes>{
    return await apiFetch('dv/graph/full-graph', {
      method: "GET"
    });
  }

  public async GetGraphWays(): Promise<Graph>{
    return await apiFetch('dv/graph/ways', {
      method: "GET"
    });
  }

  public async ClearWayNode(wayId: string): Promise<Graph>{
    return await apiFetch(`dv/graph/clear/${wayId}`, {
      method: "POST"
    });
  }


}

export const GraphClient = new GraphService();
