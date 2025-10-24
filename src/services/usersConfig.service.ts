

import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { UpdateUserConfigDto, UserConfigDto } from "@/types/user/config/user-config.dto";

class UsersConfigService {
  constructor(){}

  public async GetUserConfigByUser(userId: string): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(`ad/Users-config/u/${userId}`, {
      method: "GET",
    })
  }

  public async UpdateUserConfig(userConfig: UpdateUserConfigDto): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(`ad/Users-config/${userConfig.userId}/config`, {
      method: "PATCH",
      body:  JSON.stringify(userConfig)
    })
  }

  public async GetMyConfigs(): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch('ad/Users-config/me', {
      method: "GET",
    })
  }

}

export const UsersConfigClient = new UsersConfigService();
