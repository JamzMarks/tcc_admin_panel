export interface AuthResponse {
  user: {
    sub: string;
    email: string;
    name: string;
    role: string;
  }
}