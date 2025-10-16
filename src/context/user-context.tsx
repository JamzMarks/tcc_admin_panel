"use client";

import { AuthClient } from "@/services/auth.service";
import { AuthResponse } from "@/types/interfaces/authResponse";
import { UserResponseDto } from "@/types/interfaces/me";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserContextType {
  user: UserResponseDto | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setError(null);
    try {
      const res = await AuthClient.Me();
      setUser(res.data);
    } catch (err) {
      setError("Não foi possível atualizar os dados do usuário.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    setLoading(true);
    await fetchUser();
  };

  const logout = async () => {
    await AuthClient.Logout()
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
