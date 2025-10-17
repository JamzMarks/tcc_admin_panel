

import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { UserConfigDto } from "@/types/user/config/user-config.dto";
import { UserFilter } from "@/types/user/user-filters.type";
import { CreateUserDto, User, UserDto } from "@/types/user/user.type";

class UsersConfigService {
  constructor(){}
  public async GetUsers(filters: UserFilter): Promise<ApiResponse<User[]>> {
    console.log(filters)
    return await apiFetch("ad/users", {
      method: "GET",
    });
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch("ad/users", {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    })
  }

  public async GetUserConfigByUser(userId: string): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(`ad/users/u/${userId}`, {
      method: "GET",
    })
  }

  public async UpdateUserConfig(userId: string): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(`ad/users/u/${userId}`, {
      method: "GET",
    })
  }
}

export const UsersConfigClient = new UsersConfigService();
