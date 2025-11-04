import { create } from "zustand";

type UserState = {
  totalPoints: number;
  completedChallenges: string[];
  level: number;

  addPoints: (points: number) => void;
  completeChallenge: (challengeId: string, points: number) => void;
  resetProgress: () => void;
  calculateLevel: (points: number) => number;
};

const POINTS_PER_LEVEL = 100;

export const useUserStore = create<UserState>((set, get) => ({
  totalPoints: 0,
  completedChallenges: [],
  level: 1,

  addPoints: (points: number) => {
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
  resetProgress: () =>
    set({ totalPoints: 0, completedChallenges: [], level: 1 }),
  calculateLevel: (points) => Math.floor(points / POINTS_PER_LEVEL) + 1,
}));
