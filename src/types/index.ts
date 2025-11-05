import { DARK_COLORS, LIGHT_COLORS } from "../constants/theme";


export type ThemeMode = "light" | "dark";

export type ThemeColors = typeof LIGHT_COLORS | typeof DARK_COLORS;

export type ThemeState = {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

export type MusicChallenge = {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  points: number;
  audioUrl: string;
  completed: boolean;
  progress: number; // 0-100
  description: string;
  difficulty?: "easy" | "medium" | "hard";
};