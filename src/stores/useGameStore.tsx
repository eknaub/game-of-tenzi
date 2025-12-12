import { create } from "zustand";
import type { IDie } from "../utils/interfaces";
import type { GameMode } from "../utils/enums";
import {
  checkClassicWin,
  generateRandomDiceArray,
} from "../hooks/useGameHelper";

type GameState = {
  dice: IDie[];
  rollCount: number;
  selectedGameMode: string | GameMode;
  gameStarted: boolean;
  holdDie: (id: string) => void;
  rollDice: () => void;
  startGame: () => void;
  updateGameMode: (mode: GameMode) => void;
  resetGame: () => void;
  hasUserWon: () => boolean;
};

export const useGameStore = create<GameState>((set, get) => ({
  dice: [],
  rollCount: 0,
  selectedGameMode: "",
  gameStarted: false,
  holdDie: (id: string) => {
    set((state) => ({
      dice: state.dice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      ),
    }));
  },
  rollDice: () => {
    set((state) => ({
      dice: state.dice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      ),
      rollCount: state.rollCount + 1,
    }));
  },
  startGame: () => {
    set({ gameStarted: true, rollCount: 0, dice: generateRandomDiceArray() });
  },
  updateGameMode: (mode: GameMode) => {
    set({ selectedGameMode: mode });
  },
  resetGame: () => {
    set({
      dice: generateRandomDiceArray(),
      rollCount: 0,
      selectedGameMode: "",
      gameStarted: false,
    });
  },
  hasUserWon: () => {
    const { dice, selectedGameMode } = get();
    switch (selectedGameMode) {
      case "STANDARD":
        return checkClassicWin(dice);
      default:
        return false;
    }
  },
}));
