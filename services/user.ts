import API from "../libs/axios";

// signup
export const signupUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const res = await API.post("/user/signup", data);
  return res.data;
};

// login
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/user/login", data);
  return res.data;
};

// logout
export const logoutUser = async () => {
  const res = await API.post("/user/logout");
  return res.data;
};