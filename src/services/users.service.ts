
import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { UserFilter } from "@/types/user/user-filters.type";
import { CreateUserDto, User, UserDto } from "@/types/user/user.type";
import { buildQuery } from "@/utils/queryBuild";

class UsersService {
  constructor(){}
  public async GetUsers(filters: UserFilter): Promise<ApiResponse<UserDto[]>> {
    const queryString = buildQuery(filters);
    const url = queryString ? `ad/users?${queryString}` : "ad/users";
    console.log(url)
    return await apiFetch(url, {
      method: "GET",
    });
  }
  public async GetUsersById(id: string): Promise<ApiResponse<UserDto>> {
    return await apiFetch(`ad/users/${id}`, {
      method: "GET",
    });
  }

  public async GetUsersByEmail(email: string): Promise<ApiResponse<UserDto>> {
    return await apiFetch(`ad/users/e/${email}`, {
      method: "GET",
    });
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch("ad/users", {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    })
  }

  public async UpdateUser(id: string, userDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch(`ad/users/${id}`, {
      method: "PATCH",
      body:  JSON.stringify(userDto)
    })
  }

  public async DeleteUser(id: string): Promise<ApiResponse<void>>{
    return await apiFetch(`ad/users/${id}`, {
      method: "DELETE",
    })
  }
  public async DeleteUserByEmail(email: string): Promise<ApiResponse<void>>{
    return await apiFetch(`ad/users/${email}`, {
      method: "DELETE",
    })
  }
  public async GetRoles(): Promise<ApiResponse<string[]>>{
    return await apiFetch('ad/users/roles/list', {
      method: "GET",
    })
  }
}

export const UsersClient = new UsersService();
