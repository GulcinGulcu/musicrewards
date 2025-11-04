import { create } from "zustand";
import { SAMPLE_CHALLENGES } from "../constants/theme";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackPlayer from "react-native-track-player";

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
  positions: Record<string, number>;

  setCurrentTrack: (track: MusicChallenge | null) => void;
  setIsPlaying: (value: boolean) => void;
  updateProgress: (id: string, progress: number) => void;
  markChallengeComplete: (id: string) => void;
  saveTrackPosition: (id: string, pos: number) => void;
  getSavedTrackPosition: (id: string) => number | undefined;

  hardReset: () => Promise<void>;
};

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      challenges: SAMPLE_CHALLENGES,
      currentTrack: null,
      isPlaying: false,
      positions: {},
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

      saveTrackPosition: (id, pos) =>
        set((state) => ({ positions: { ...state.positions, [id]: pos } })),

      getSavedTrackPosition: (id) => get().positions[id],

      hardReset: async () => {
        console.log("Reset starts...");
        try {
          // 1) reset track player
          try {
            await TrackPlayer.reset();
            await TrackPlayer.stop();
          } catch (e) {
            console.warn("TrackPlayer reset error", e);
          }

          // 2) clean persist
          await AsyncStorage.removeItem("music-storage");

          set({
            challenges: SAMPLE_CHALLENGES,
            positions: {},
            currentTrack: null,
            isPlaying: false,
          });

          console.log("Reset completed");
        } catch (err) {
          console.warn("Error in hard reset", err);
        }
      },
    }),
    {
      name: "music-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        challenges: s.challenges,
        positions: s.positions,
      }),
    }
  )
);
