// /types/user.d.ts
export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: IUser;
}