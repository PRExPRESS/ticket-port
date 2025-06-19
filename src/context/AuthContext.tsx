"use client";
import { UserRole } from "@/enum/user.enum";
import { signOutUser } from "@/lib/auth";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  if (typeof window === "undefined") return null;

  const login = (data: User) => {
    setUser(data);
    if (typeof window !== "undefined") {
      // set expiry time to 1h from now
      const expiryDate = new Date(Date.now() + 3600 * 1000);
      localStorage.setItem("expiry", Math.floor(expiryDate.getTime() / 1000).toString());
      localStorage.setItem("user", JSON.stringify(data));
      switch (data.role) {
        case UserRole.ADMIN:
          window.location.href = "/admin";
          break;
        case UserRole.USER:
          window.location.href = "/";
          break;
        case UserRole.ORGANIZER:
          window.location.href = "/organizer";
          break;
        default:
          window.location.href = "/";
      }
    }
    
  };

  const logout = async () => {
    setUser(null);
    await signOutUser();
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
