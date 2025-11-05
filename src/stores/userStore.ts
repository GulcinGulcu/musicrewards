import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserState = {
  totalPoints: number;
  completedChallenges: string[];
  level: number;

  addPoints: (points: number) => void;
  completeChallenge: (challengeId: string, points: number) => void;
  calculateLevel: (points: number) => number;
  resetUserData: () => Promise<void>;
};

const POINTS_PER_LEVEL = 100;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      completedChallenges: [],
      level: 1,

      addPoints: (points) => {
        const newPoints = get().totalPoints + points;
        const newLevel = get().calculateLevel(newPoints);
        set({ totalPoints: newPoints, level: newLevel });
      },

      completeChallenge: (challengeId, points) => {
        const { completedChallenges } = get();
        if (completedChallenges.includes(challengeId)) return;

        const updated = [...completedChallenges, challengeId];
        const newPoints = get().totalPoints + points;
        const newLevel = get().calculateLevel(newPoints);

        set({
          completedChallenges: updated,
          totalPoints: newPoints,
          level: newLevel,
        });
      },
      resetUserData: async () => {
        console.log("Reset user store starts...");
        try {
          await AsyncStorage.removeItem("user-storage");
          set({ totalPoints: 0, completedChallenges: [], level: 1 });
          console.log("User storage reset completed");
        } catch (err) {
          console.warn("Error in hard reset of user store", err);
        }
      },
      calculateLevel: (points) => Math.floor(points / POINTS_PER_LEVEL) + 1,
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        totalPoints: s.totalPoints,
        completedChallenges: s.completedChallenges,
        level: s.level,
      }),
    }
  )
);
