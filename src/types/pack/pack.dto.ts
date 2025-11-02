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
