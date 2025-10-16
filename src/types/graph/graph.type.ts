export type Relationships = {
    id: string;
    type: string;
    startNodeId: number;
    endNodeId: number;
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


export type WayWithNodes = {
    nodes: Way[],
    relationships: Relationships[];
}