import { create } from "zustand";
import { SAMPLE_CHALLENGES } from "../constants/theme";

export type MusicChallenge = {
  id: string;
  title: string;
  artist: string;
  duration: number; // saniye
  points: number;
  audioUrl: string;
  completed: boolean;
  progress: number; // 0-100
  description: string;
  difficulty?: "easy" | "medium" | "hard";
};

type MusicState = {
  challenges: MusicChallenge[];
  currentTrack: MusicChallenge | null;
  isPlaying: boolean;

  setCurrentTrack: (track: MusicChallenge | null) => void;
  setIsPlaying: (value: boolean) => void;
  updateProgress: (id: string, progress: number) => void;
  markChallengeComplete: (id: string) => void;
};

export const useMusicStore = create<MusicState>()((set, get) => ({
  challenges: SAMPLE_CHALLENGES,
  currentTrack: null,
  isPlaying: false,
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  updateProgress: (id, progress) =>
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, progress: Math.min(progress, 100) }
          : challenge
      ),
    })),
  markChallengeComplete: (id) =>
    set((state) => ({
      challenges: state.challenges.map((challenge) =>
        challenge.id === id
          ? { ...challenge, completed: true, progress: 100 }
          : challenge
      ),
    })),
}));
