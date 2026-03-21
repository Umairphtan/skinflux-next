import API from "@/libs/axios";

type SignupData = { username: string; email: string; password: string };
type LoginData = { email: string; password: string };

export type AuthResponse = {
  user: { _id: string; username: string; email: string; role: string };
  token: string;
  message: string;
};

// SIGNUP
export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  const res = await API.post("/user/signup", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await API.post("/user/login", data);
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await API.post("/user/logout");
  return res.data;
};