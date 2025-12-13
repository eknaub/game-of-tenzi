import { create } from "zustand";
import type { ILeaderboard, ILeaderboardEntry } from "../utils/interfaces";

type Leaderboard = {
  leaderboard: ILeaderboard;
  addToLeaderboard: (entry: ILeaderboardEntry) => void;
};

export const useLeaderboardStore = create<Leaderboard>((set) => ({
  leaderboard: {
    entries: [
      { name: "Alice", score: 450 },
      { name: "Charlie", score: 200 },
      { name: "Diana", score: 100 },
      { name: "Edward", score: 750 },
      { name: "George", score: 620 },
      { name: "Ivan", score: 480 },
      { name: "Julia", score: 650 },
    ],
  },
  addToLeaderboard: (entry: ILeaderboardEntry) => {
    set((state) => ({
      leaderboard: {
        entries: [...state.leaderboard.entries, entry],
      },
    }));
  },
}));
