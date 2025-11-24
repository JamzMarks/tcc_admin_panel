import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { CreatePackDto, Pack, PackDto, PackWithInfos } from "@/types/pack/pack.dto";


class PackService {
  constructor() {}

  public async GetPacks(): Promise<ApiResponse<Pack[]>>{
    return await apiFetch('/dv/pack', {
      method: "GET"
    });
  } 

  public async CreatePack(createPackDto: CreatePackDto): Promise<ApiResponse<PackDto>>{
    return await apiFetch('/dv/pack', {
      method: "POST",
      body:  JSON.stringify(createPackDto)
    });
  }

  public async GetPack(id: string): Promise<ApiResponse<PackWithInfos>>{
    return await apiFetch(`/dv/pack/${id}`, {
      method: "GET"
    });
  }
}

export const PackClient = new PackService();
