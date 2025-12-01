import { config } from './../../middleware';
import { SemaforoDto } from "../devices/semaforo/semaforoDto.type";

export interface PackDto extends CreatePackDto{
  id: number;
}

export interface SubPack {
    id: number;
    packId: number;
    semaforos: SemaforoDto[];
}

export interface CreatePackDto {
  name: string;
  configs: {
    cicle: number;
  },
  semaforos: SemaforoDto[];
  subPacks: SubPack[];
}

export type Pack = {
  id: string;
  name: string | null;
  cicle: number;
  items?: number; 
};


export type SubpackInfo = {
  subpackId: string;
  name: string | null;
  semaforos: string[]; 
};

export type PackWithInfos = {
  packId: string;
  name: string | null;
  cicle: number;
  semaforos: string[]; 
  subpacks: SubpackInfo[];
};