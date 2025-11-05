import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DARK_COLORS, LIGHT_COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeMode, ThemeState } from "../types";

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "dark",
      colors: DARK_COLORS,
      toggleTheme: () => {
        const nextTheme = get().mode === "dark" ? "light" : "dark";
        set({
          mode: nextTheme,
          colors: nextTheme === "dark" ? DARK_COLORS : LIGHT_COLORS,
        });
      },
      setTheme: (mode) =>
        set({
          mode,
          colors: mode === "dark" ? DARK_COLORS : LIGHT_COLORS,
        }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ mode: s.mode }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Theme rehydration failed:", error);
          return;
        }
        if (state) {
          const mode = state.mode;
          state.colors = mode === "dark" ? DARK_COLORS : LIGHT_COLORS;
        }
      },
    }
  )
);
