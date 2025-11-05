import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { CreatePackDto, PackDto } from "@/types/pack/pack.dto";


import { buildQuery } from "@/utils/queryBuild";

class PackService {
  constructor() {}

  public async GetPacks(): Promise<ApiResponse<PackDto[]>>{
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
}

export const PackClient = new PackService();
