import API from "@/libs/axios";
import { AuthResponse } from "@/types/user";

// SIGNUP
export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await API.post("/user/signup", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const res = await API.post("/user/login", data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await API.post("/user/logout");
  return res.data;
};