"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { IUser } from "../types/user";
import { login, logout as logoutService, signup } from "../services/user";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  signupUser: (username: string, email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  const loginUser = async (email: string, password: string) => {
    const res = await login(email, password);
    if (res.success && res.user) {
      setUser(res.user);
      router.push("/"); // redirect home
    } else {
      throw new Error(res.message);
    }
  };

  const signupUser = async (username: string, email: string, password: string) => {
    const res = await signup(username, email, password);
    if (res.success && res.user) {
      setUser(res.user);
      router.push("/"); // redirect home
    } else {
      throw new Error(res.message);
    }
  };

  const logoutUser = async () => {
    await logoutService();
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginUser, signupUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};