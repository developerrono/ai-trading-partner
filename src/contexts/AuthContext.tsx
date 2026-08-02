import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { clearToken, setToken as persistToken, getToken } from "@/services/api";
import { fetchMe, loginRequest, registerRequest } from "@/services/authApi";
import type { User } from "@/types/auth";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  /** True only during the initial "do we have a valid session?" check on app load. */
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchMe()
      .then(setUser)
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { access_token } = await loginRequest({ email, password });
    persistToken(access_token);
    const me = await fetchMe();
    setUser(me);
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    const result = await registerRequest({ email, password, display_name: displayName });
    persistToken(result.access_token);
    const me = await fetchMe();
    setUser(me);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
