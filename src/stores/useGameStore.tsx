import { create } from "zustand";
import type { IDie } from "../utils/interfaces";
import type { GameMode } from "../utils/gameModeEnums";
import {
  calculateCompetitiveScore,
  checkClassicWin,
  checkHighRollerWin,
  checkLowRollerWin,
  checkMissingziWin,
  checkOddEvenWin,
  checkPairsOnlyWin,
  checkPyramidWin,
  checkSplitziWin,
  checkTargetSumWin,
  checkTargetWin,
  generateRandomDiceArray,
} from "../hooks/useGameHelper";
import { GameModifier } from "../utils/gameModifierEnums";

type GameState = {
  dice: IDie[];
  score: number; //used for competitive mode to hold score
  targetNumber: number; //used for target number gamemode
  setTargetNumber: (val: number) => void;
  rollCount: number;
  selectedGameMode: GameMode | "";
  gameStarted: boolean;
  secondsElapsed: number;
  incrementSecondsElapsed: () => void;
  holdDie: (id: string) => void;
  rollDice: () => void;
  startGame: () => void;
  updateGameMode: (mode: GameMode) => void;
  resetGame: () => void;
  hasUserWon: () => boolean;
  calculateAndSetScore: () => void;
  getHeaderText: () => string;
  restartGame: () => void;
  selectedModifiers: GameModifier[];
  toggleModifier: (modifier: GameModifier) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  dice: [],
  score: 0,
  targetNumber: 0,
  setTargetNumber: (val: number) => {
    set(() => ({
      targetNumber: val,
    }));
  },
  rollCount: 0,
  selectedGameMode: "",
  gameStarted: false,
  secondsElapsed: 0,
  incrementSecondsElapsed: () => {
    set((state) => ({ secondsElapsed: state.secondsElapsed + 1 }));
  },
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
    const { selectedGameMode } = get();
    const diceCount = selectedGameMode === "MEGA_TENZI" ? 20 : 10;
    set({
      gameStarted: true,
      rollCount: 0,
      dice: generateRandomDiceArray(diceCount),
      secondsElapsed: 0,
    });
  },
  updateGameMode: (mode: GameMode) => {
    set({ selectedGameMode: mode });
  },
  resetGame: () => {
    set({
      dice: [],
      rollCount: 0,
      secondsElapsed: 0,
      selectedGameMode: "",
      gameStarted: false,
    });
  },
  hasUserWon: () => {
    const { dice, selectedGameMode, targetNumber } = get();
    switch (selectedGameMode) {
      case "STANDARD":
      case "MEGA_TENZI":
      case "SPEED_TENZI":
        return checkClassicWin(dice);
      case "HIGH_ROLLER":
        return checkHighRollerWin(dice);
      case "LOW_ROLLER":
        return checkLowRollerWin(dice);
      case "SPLITZI":
        return checkSplitziWin(dice);
      case "ODD_EVEN":
        return checkOddEvenWin(dice);
      case "MISSINGZI":
        return checkMissingziWin(dice);
      case "PAIRS_ONLY":
        return checkPairsOnlyWin(dice);
      case "PYRAMID":
        return checkPyramidWin(dice);
      case "TARGET_TENZI":
        return checkTargetWin(dice, targetNumber);
      case "TARGET_SUM":
        return checkTargetSumWin(dice);
      default:
        return false;
    }
  },
  calculateAndSetScore: () => {
    const { selectedModifiers, rollCount, secondsElapsed, selectedGameMode } =
      get();
    if (selectedModifiers.includes(GameModifier.COMPETITIVE_MODE)) {
      const score = calculateCompetitiveScore(
        selectedModifiers,
        rollCount,
        secondsElapsed,
        selectedGameMode
      );
      set({ score });
    }
  },
  getHeaderText: () => {
    const { rollCount, secondsElapsed, selectedGameMode } = get();
    const selectedGameModeNeedsTimer = selectedGameMode === "SPEED_TENZI";

    return `Rolls: ${rollCount} ${
      selectedGameModeNeedsTimer ? `| ${secondsElapsed}s` : ""
    }`;
  },
  restartGame: () => {
    set({
      dice: generateRandomDiceArray(),
      rollCount: 0,
      secondsElapsed: 0,
    });
  },
  selectedModifiers: [],
  toggleModifier: (modifier: GameModifier) => {
    set((state) => ({
      selectedModifiers: state.selectedModifiers.includes(modifier)
        ? state.selectedModifiers.filter((m) => m !== modifier)
        : [...state.selectedModifiers, modifier],
    }));
  },
}));
