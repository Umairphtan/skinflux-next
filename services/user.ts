import API from "../libs/axios";
import { IUser } from "../types/user";

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUser;
}

// Signup
export const signup = async (username: string, email: string, password: string) => {
  const { data } = await API.post<AuthResponse>("/user/signup", { username, email, password });
  return data;
};

// Login
export const login = async (email: string, password: string) => {
  const { data } = await API.post<AuthResponse>("/user/login", { email, password });
  return data;
};

// Logout
export const logout = async () => {
  const { data } = await API.post<AuthResponse>("/user/logout");
  return data;
};