export interface SemaforoDto {
  id: string;
  macAddress: string;
  deviceId: string;
  deviceKey: string,
  isActive?: boolean;
  createdAt?: Date; 
  updatedAt?: Date;
  packId?: number | null;
  subPackId?: number | null;
}

export interface SemaforoInfoDto   {
  semaforo: SemaforoDto;
  nodes: {
    id: string;
    lon: number;
    lat: number;
  },
  ways: any,
  packs: {
    id: number;
    cicle: number;
    name: string;
    subPacks?: {
      id: number;
    }
  }
}

export interface  CreateSemaforo {
  macAddress: string;
  deviceId: string;
}


export interface UpdateSemaforo extends CreateSemaforo {
  isActive: boolean;
  macAddress: string;
  ip: string;
}
