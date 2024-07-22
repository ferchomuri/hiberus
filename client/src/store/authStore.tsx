import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { login, register } from "../bridges/Auth";
import User from "../types/User";
import { showNotification } from "../components/Notification/Notification";

interface useAuthStore {
  user?: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  registerUser: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const useAuth = create<useAuthStore>((set) => ({
  user: undefined,
  signIn: async (username: string, password: string): Promise<void> => {
    try {
      const response = await login(username, password);

      localStorage.setItem("token", response.token);

      const decoded: User = jwtDecode(response.token);

      set(() => ({
        user: {
          fullName: decoded.fullName,
          email: decoded.email,
          role: decoded.role,
        },
      }));

      showNotification({
        message: "Inicio de sesión exitoso",
        type: "success",
      });
      return;
    } catch (error: unknown) {
      showNotification({ message: "Error al iniciar sesión", type: "error" });
      set({ user: null });
    }
  },
  fetchCurrentUser: async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({ user: null });
        return;
      }

      const decoded: User = jwtDecode(token);

      set({
        user: {
          fullName: decoded.fullName,
          email: decoded.email,
          role: decoded.role,
        },
      });
    } catch (error: unknown) {
      set({ user: null });
    }
  },
  registerUser: async (
    fullName: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      await register(fullName, email, password);
      showNotification({ message: "Usuario registrado", type: "success" });
      return;
    } catch (error: unknown) {
      showNotification({
        message: "Error al registrar usuario",
        type: "error",
      });
      set({ user: null });
    }
  },
}));

export default useAuth;
