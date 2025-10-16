/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiFetch } from "@/lib/api/client";
import { Graph, WayWithNodes } from "@/types/graph/graph.type";
// import { ApiResponse } from "@/types/interfaces/apiResponse";
// import qs from "query-string";

class GraphService {
  private BASE_URL: string;
  constructor() {
    this.BASE_URL = "http://localhost:3005/api/v1/graph/";
  }

  public async GetGraphMap(): Promise<Graph>{
    return await apiFetch(this.BASE_URL, 'export/json', {
      method: "GET"
    });
  }

  public async GetGraphWayMap(): Promise<WayWithNodes>{
    return await apiFetch(this.BASE_URL, 'full-graph', {
      method: "GET"
    });
  }

  public async GetGraphWays(): Promise<Graph>{
    return await apiFetch(this.BASE_URL, 'ways', {
      method: "GET"
    });
  }

  public async ClearWayNode(wayId: string): Promise<Graph>{
    return await apiFetch(this.BASE_URL, `clear/${wayId}`, {
      method: "POST"
    });
  }


}

export const GraphClient = new GraphService();
