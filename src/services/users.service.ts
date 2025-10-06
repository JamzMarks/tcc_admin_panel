
import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { UserFilter } from "@/types/user/user-filters.type";
import { CreateUserDto, User, UserDto } from "@/types/user/user.type";

class UsersService {
  public BASE_URL: string
  constructor(){
    this.BASE_URL = process.env.AUTH_API_URL || "https://localhost:4000/api/v1";
  }
  public async GetUsers(filters: UserFilter): Promise<ApiResponse<UserDto[]>> {
    console.log(filters)
    return await apiFetch(this.BASE_URL,"/users", {
      method: "GET",
    });
  }
  public async GetUsersById(id: string): Promise<ApiResponse<UserDto>> {
    return await apiFetch(this.BASE_URL,`/users/${id}`, {
      method: "GET",
    });
  }

  public async GetUsersByEmail(email: string): Promise<ApiResponse<UserDto>> {
    return await apiFetch(this.BASE_URL,`/users/e/${email}`, {
      method: "GET",
    });
  }

  public async CreateUser(createUserDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch(this.BASE_URL, "/users", {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    })
  }

  public async UpdateUser(id: string, userDto: CreateUserDto): Promise<ApiResponse<UserDto>>{
    return await apiFetch(this.BASE_URL, `/users/${id}`, {
      method: "PATCH",
      body:  JSON.stringify(userDto)
    })
  }

  public async DeleteUser(id: string): Promise<ApiResponse<void>>{
    return await apiFetch(this.BASE_URL, `/users/${id}`, {
      method: "DELETE",
    })
  }
  public async DeleteUserByEmail(email: string): Promise<ApiResponse<void>>{
    return await apiFetch(this.BASE_URL, `/users/${email}`, {
      method: "DELETE",
    })
  }
  public async GetRoles(): Promise<ApiResponse<string[]>>{
    return await apiFetch(this.BASE_URL, '/users/roles/list', {
      method: "GET",
    })
  }
}

export const UsersClient = new UsersService();
