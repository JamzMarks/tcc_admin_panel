import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { LoginDto, SignUpDto } from "@/types/interfaces/authDto";
import { AuthResponse } from "@/types/interfaces/authResponse";
import { UserResponseDto } from "@/types/interfaces/me";
import { UpdateUserPasswordDto } from "@/types/user/update-user-password.type";


class AuthService {
  constructor(){}

  public async Login(data: LoginDto): Promise<ApiResponse<AuthResponse>> {
    return await apiFetch( "ad/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  public async Me(): Promise<ApiResponse<UserResponseDto>> {
    return await apiFetch("ad/auth/me", { 
      method: "GET",
    });
  }

  public async UpdateUserPassword(id: string, data: UpdateUserPasswordDto): Promise<ApiResponse<{message: string}>>{
    return await apiFetch(`ad/auth/password/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  public async RefreshToken(): Promise<ApiResponse<string>> {
    return await apiFetch("ad/auth/refresh", {
      method: "POST",
    });
  }

  public async Logout(): Promise<ApiResponse<string>> {
    return await apiFetch("ad/auth/logout", {
      method: "POST",
    });
  }

}

export const AuthClient = new AuthService();
