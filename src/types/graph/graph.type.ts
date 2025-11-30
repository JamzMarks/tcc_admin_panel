

export type Node = {
    id: number;
    labels?: string[];
    properties?: {
        // id: string,
        name?: string;
        type?: string;
        lat?: number,
        lon?: number

    };  
};

export interface Graph {
    nodes: Node[];
    relationships: Relationships[];
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



//asdasdasdasdasdasdasdasdasdasdasdasd

export type FNode = {
    id: string;
    lat?: number,
    lon?: number
}

export type Relationships = {
    id: string;
    type: string;
    startNodeId: string;
    endNodeId: string;
    properties?: object;
};

export type Way = {
    properties: {
        wayId: string,
        name?: string,
        priority: number,
        highway?: string,
        service?: string,
        maxspeed?: string,
        length?: number,
        oneway?: string,  
        bridge?: string,
        
        [key: string]: any,
    }
    nodes: FNode[]
}

export type WayWithNodes = {
    nodes: Way[],
    relationships: Relationships[],
    devices: Devices[]
}