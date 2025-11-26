export type Device = {
  macAddress: string;
  createdAt?: string;
  updatedAt?: string;
  
}

export interface Camera extends Device {
  id: number;
  ip: string;
  deviceId: string;
  isActive?: boolean;
}

export interface CreateCamera extends Device{
  deviceId: string;
  ip: string
}


