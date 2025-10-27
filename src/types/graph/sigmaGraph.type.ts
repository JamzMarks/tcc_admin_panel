export interface GraphDataNode {
  properties?: WayProperties;
  nodes: NodeElement[];
}
export interface GraphNodeAttributes {
  label: string;
  tags: {
    nodeId: string;
    ways: WayProperties[];
    quantidadeWays?: number;
    [key: string]: any;
  };
  size: number;
  x: number;
  y: number;
  color?: string;
}
export interface NodeElement {
  id: string;
  lon: number;
  lat: number;
  tags?: Record<string, any>; 
}

export interface WayProperties {
  wayId: string;
  name?: string;
  highway?: string;
  [key: string]: any;
}