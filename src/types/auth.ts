export type User = {
  id: string;
  email: string;
  display_name: string;
  timezone: string;
  created_at: string;
};

export type AuthResponse = {
  id: string;
  email: string;
  display_name: string;
  access_token: string;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};
