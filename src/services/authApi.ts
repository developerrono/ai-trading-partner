import { apiFetch } from "./api";
import type { AuthResponse, TokenResponse, User } from "@/types/auth";

export function registerRequest(data: {
  email: string;
  password: string;
  display_name: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/register", { method: "POST", body: data, skipAuth: true });
}

export function loginRequest(data: { email: string; password: string }): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/login", { method: "POST", body: data, skipAuth: true });
}

export function fetchMe(): Promise<User> {
  return apiFetch<User>("/auth/me");
}

export function updateMe(data: { display_name?: string; timezone?: string }): Promise<User> {
  return apiFetch<User>("/auth/me", { method: "PATCH", body: data });
}
