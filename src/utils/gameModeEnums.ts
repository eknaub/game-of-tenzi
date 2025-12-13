export const GameModeCategories = {
  classicSpeedy: "Classic & Speedy",
  patternLogic: "Pattern & Logic",
};
export const GameMode = {
  STANDARD: "STANDARD",
  MEGA_TENZI: "MEGA_TENZI",
  HIGH_ROLLER: "HIGH_ROLLER",
  LOW_ROLLER: "LOW_ROLLER",
  SPEED_TENZI: "SPEED_TENZI",
  TARGET_TENZI: "TARGET_TENZI",
  SPLITZI: "SPLITZI",
  ODD_EVEN: "ODD_EVEN",
  MISSINGZI: "MISSINGZI",
  PAIRS_ONLY: "PAIRS_ONLY",
  PYRAMID: "PYRAMID",
  TARGET_SUM: "TARGET_SUM",
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];

interface GameModeDetails {
  name: string;
  description: string;
  score: number;
  category: string;
}

export const GameModeInfo: Record<GameMode, GameModeDetails> = {
  [GameMode.STANDARD]: {
    name: "Standard Tenzi",
    description: "Roll and hold until all dice show the same number.",
    score: 100,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.MEGA_TENZI]: {
    name: "Mega Tenzi",
    description: "Play with 20 dice instead of 10 for double the fun!",
    score: 150,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.HIGH_ROLLER]: {
    name: "High Roller",
    description: "Get all dice to show 6s only.",
    score: 120,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.LOW_ROLLER]: {
    name: "Low Roller",
    description: "Get all dice to show 1s only.",
    score: 120,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.SPEED_TENZI]: {
    name: "Speed Tenzi",
    description:
      "Roll as fast as possible to get all dice to show the same number.",
    score: 100,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.TARGET_TENZI]: {
    name: "Target Tenzi",
    description:
      "Declare a target number and get all dice to show the target number.",
    score: 110,
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.SPLITZI]: {
    name: "Splitzi",
    description: "Get 5 dice showing one number and 5 dice showing another.",
    score: 140,
    category: GameModeCategories.patternLogic,
  },
  [GameMode.ODD_EVEN]: {
    name: "Odd/Even",
    description: "Roll until all dice show either odd or even numbers.",
    score: 130,
    category: GameModeCategories.patternLogic,
  },
  [GameMode.MISSINGZI]: {
    name: "Missingzi",
    description: "Go for 9 of one number, leaving one die out.",
    score: 160,
    category: GameModeCategories.patternLogic,
  },
  [GameMode.PAIRS_ONLY]: {
    name: "Pairs Only",
    description: "Get 5 pairs of matching numbers",
    score: 180,
    category: GameModeCategories.patternLogic,
  },
  [GameMode.PYRAMID]: {
    name: "Pyramid",
    description:
      "Get 1 die showing 1, 2 showing 2s, 3 showing 3s, 4 showing 4s",
    score: 200,
    category: GameModeCategories.patternLogic,
  },
  [GameMode.TARGET_SUM]: {
    name: "Target Sum",
    description: "Get all dice to sum to exactly 30",
    score: 170,
    category: GameModeCategories.patternLogic,
  },
};
