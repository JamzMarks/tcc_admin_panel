import { SemaforoDto } from "../devices/semaforo/semaforoDto.type";

export interface LinkSemaforo {
  semaforoData: SemaforoDto;
  wayId: string;
}