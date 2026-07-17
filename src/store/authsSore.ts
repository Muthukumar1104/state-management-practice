import { create } from "zustand";
import { login as loginService } from "../services/authService";

import type {
  AuthUser,
  LoginCredentials,
} from "../types/auth";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;

  login: (
    credentials: LoginCredentials
  ) => Promise<boolean>;

  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (credentials) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await loginService(credentials);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Login failed",
      });

      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
}));