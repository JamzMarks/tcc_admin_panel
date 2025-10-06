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