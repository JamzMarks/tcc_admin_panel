

import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { UserConfigDto } from "@/types/user/config/user-config.dto";
import { UserFilter } from "@/types/user/user-filters.type";
import { CreateUserDto, User, UserDto } from "@/types/user/user.type";

class UsersConfigService {
  public BASE_URL: string
  constructor(){
    this.BASE_URL = process.env.AUTH_API_URL || "https://localhost:4000/api/v1";
  }
  public async GetUsers(filters: UserFilter): Promise<ApiResponse<User[]>> {
    console.log(filters)
    return await apiFetch(this.BASE_URL,"/users", {
      method: "GET",
    });
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch(this.BASE_URL, "/users", {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    })
  }

  public async GetUserConfigByUser(userId: string): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(this.BASE_URL, `/users/u/${userId}`, {
      method: "GET",
    })
  }

  public async UpdateUserConfig(userId: string): Promise<ApiResponse<UserConfigDto>>{
    return await apiFetch(this.BASE_URL, `/users/u/${userId}`, {
      method: "GET",
    })
  }

}

export const UsersConfigClient = new UsersConfigService();
