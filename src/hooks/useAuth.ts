"use client";

import { useCallback } from "react";
import { useUserStore, type UserProfile } from "@/stores/userStore";
import { generateId } from "@/lib/utils/helpers";
import { LS_KEY_USER } from "@/lib/utils/constants";

interface AuthResult {
  success: boolean;
  error?: string;
}

export function useAuth() {
  const {
    user,
    isAuthenticated,
    setUser,
    logout: storeLogout,
  } = useUserStore();

  const signup = useCallback(
    (
      username: string,
      displayName: string,
      password: string,
      role: "student" | "teacher" = "student",
    ): AuthResult => {
      if (!username || !displayName || !password) {
        return { success: false, error: "All fields are required" };
      }
      if (password.length < 4) {
        return {
          success: false,
          error: "Password must be at least 4 characters",
        };
      }

      // Check if username already taken (localStorage-based)
      const accountsRaw = localStorage.getItem("codeblock_accounts");
      const accounts: Record<string, { passwordHash: string }> = accountsRaw
        ? JSON.parse(accountsRaw)
        : {};

      if (accounts[username]) {
        return { success: false, error: "Username already taken" };
      }

      // Store account (simple hash for localStorage demo - NOT production-safe)
      accounts[username] = { passwordHash: btoa(password) };
      localStorage.setItem("codeblock_accounts", JSON.stringify(accounts));

      const profile: UserProfile = {
        id: generateId("usr"),
        username,
        displayName,
        avatarEmoji: role === "teacher" ? "👩‍🏫" : "🐱",
        avatarBgColor: role === "teacher" ? "#6366F1" : "#7c3aed",
        role,
      };

      setUser(profile);
      return { success: true };
    },
    [setUser],
  );

  const login = useCallback(
    (username: string, password: string): AuthResult => {
      if (!username || !password) {
        return { success: false, error: "All fields are required" };
      }

      const accountsRaw = localStorage.getItem("codeblock_accounts");
      const accounts: Record<string, { passwordHash: string }> = accountsRaw
        ? JSON.parse(accountsRaw)
        : {};

      const account = accounts[username];
      if (!account || account.passwordHash !== btoa(password)) {
        return { success: false, error: "Invalid username or password" };
      }

      // Load existing user data or create profile
      const userRaw = localStorage.getItem(LS_KEY_USER);
      if (userRaw) {
        try {
          const persisted = JSON.parse(userRaw);
          if (persisted.user?.username === username) {
            setUser(persisted.user);
            return { success: true };
          }
        } catch {
          // fall through
        }
      }

      const profile: UserProfile = {
        id: generateId("usr"),
        username,
        displayName: username,
        avatarEmoji: "🐱",
        avatarBgColor: "#7c3aed",
        role: "student",
      };
      setUser(profile);
      return { success: true };
    },
    [setUser],
  );

  const logout = useCallback(() => {
    storeLogout();
  }, [storeLogout]);

  return {
    user,
    isAuthenticated,
    login,
    signup,
    logout,
  };
}
