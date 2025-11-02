export type Relationships = {
    id: string;
    type: string;
    startNodeId: string;
    endNodeId: string;
    properties: object;
};

export type Node = {
    id: number;
    labels?: string[];
    properties?: {
        // id: string,
        name?: string;
        type?: string;
        lat?: number,
        lon?: number
        //aqui pode ter mais informacoes 
    };  
};

export interface Graph {
    nodes: Node[];
    relationships: Relationships[];
}


export type FNode = {
    id: string;
    lat?: number,
    lon?: number
    tags?: any;
}


export type Way = {
    properties: {
        name?: string,
        highway?: string,
        service?: string,
        id?: {
            low: number,
            high: number
        },
        oneway?: string,  
        [key: string]: any,
    }
    nodes: FNode[]
}

export type DeviceBase = {
  id: string;     
  type: "Device" | "Semaforo";
  labels: string[];
};

export type DeviceNode = DeviceBase & {
  type: "Device";
  properties: {
    macAddress: string;
    lastUpdate: string;
    confiability: number;
    id: string;
    type: string; 
    isActive: boolean;
    deviceId: string;
    flow: number;
  };
};

export type SemaforoNode = DeviceBase & {
  type: "Semaforo";
  properties: {
    deviceKey: string;
    id: number;
    deviceId: string;
  };
};

export type Devices = DeviceNode | SemaforoNode;

export type DevicesRelations = {
  id: string,
  type: "HAS_SEMAFORO" | "DEVICE_BETWEEN";
  startNodeId: string
  endNodeId: string
  properties: object
}

export type WayWithNodes = {
    nodes: Way[],
    relationships: Relationships[],
    devices: Devices[]
}