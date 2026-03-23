"use client";

import { createContext, useContext, useState } from "react";
import { loginUser, signupUser, logoutUser } from "@/services/user";

interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  signup: (data: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ LOGIN
  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginUser(data);

      if (res.user && res.token) {
        setUser(res.user);

        // 🔑 Save token in localStorage
        localStorage.setItem("token", res.token);
      }

    } catch (err: any) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SIGNUP
  const signup = async (data: { username: string; email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signupUser(data);

      if (res.data && res.data.token) {
        setUser(res.data.user || null);

        // 🔑 Save token in localStorage
        localStorage.setItem("token", res.data.token);
      }

    } catch (err: any) {
      console.error("SIGNUP ERROR:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      await logoutUser();

      setUser(null);

      // 🔑 Remove token from localStorage
      localStorage.removeItem("token");

    } catch (err: any) {
      console.error("LOGOUT ERROR:", err.response?.data || err.message);
      setError("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};