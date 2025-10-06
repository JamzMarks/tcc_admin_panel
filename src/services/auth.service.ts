import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { LoginDto, SignUpDto } from "@/types/interfaces/authDto";
import { AuthResponse } from "@/types/interfaces/authResponse";
import { UpdateUserPasswordDto } from "@/types/user/update-user-password.type";


class AuthService {
  public BASE_URL: string
  constructor(){
    this.BASE_URL = process.env.AUTH_API_URL || "https://localhost:4000/api/v1";
  }

  public async Login(data: LoginDto): Promise<ApiResponse<AuthResponse>> {
    return await apiFetch(this.BASE_URL, "/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async UpdateUserPassword(id: string, data: UpdateUserPasswordDto): Promise<ApiResponse<{message: string}>>{
    return await apiFetch(this.BASE_URL, `/auth/password/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  public async RefreshToken(): Promise<ApiResponse<string>> {
    return await apiFetch(this.BASE_URL, "/auth/refresh", {
      method: "POST",
    });
  }

  public async Logout(): Promise<ApiResponse<string>> {
    return await apiFetch(this.BASE_URL, "/auth/logout", {
      method: "POST",
    });
  }

}

export const AuthClient = new AuthService();
