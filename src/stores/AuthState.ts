import { create } from 'zustand';
import { database } from "../model/init.ts";


interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const saveToken = async (dtoken) => {
  await database.localStorage.set("token", dtoken);
};

const truncateAuthTable = async () => {
  await database.localStorage.remove("token");
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,

  login: (token: string) => {
    saveToken(token).catch(err => console.error(err));
    set({ isAuthenticated: true, token });
  },

  logout: () => {
    truncateAuthTable().catch(err => console.error(err));
    set({ isAuthenticated: false, token: null });
  },
  checkAuthStatus: async () => {
    try {
      const token = await database.localStorage.get("token");

      if (token && token.length > 0) {
        set({ isAuthenticated: true, token: token });
      } else {
        set({ isAuthenticated: false, token: '' });
      }
    } catch (err) {
      console.error('Failed to check auth status:', err);
      set({ isAuthenticated: false, token: '' });
    }
  },
}));
