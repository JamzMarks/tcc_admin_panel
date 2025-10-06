export type Device = {
  macAddress: string;
  ip: string;
  createdAt?: string;
  updatedAt?: string;
  
}

export interface Camera extends Device {
  id: number;
  deviceId: string;
  isActive?: boolean;
}

export interface CreateCamera extends Device{
  deviceId: string;
}

export interface Semaforo extends Device {
  id: number;
  deviceId: string;
  isActive: boolean;
  packId?: number | null;
  subPackId?: number | null;
}

export interface CreateSemaforo {
  macAddress: string;
  ip: string;
  deviceId: string;
}
