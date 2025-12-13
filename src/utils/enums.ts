export const GameModeCategories = {
  classicSpeedy: "Classic & Speedy",
  patternLogic: "Pattern & Logic",
  rollLimit: "Roll Limit Modes",
  competitive: "Competitive Modes",
};

export const GameMode = {
  STANDARD: "STANDARD",
  MEGA_TENZI: "MEGA_TENZI",
  HIGH_ROLLER: "HIGH_ROLLER",
  LOW_ROLLER: "LOW_ROLLER",
  SPEED_TENZI: "SPEED_TENZI",
  SPLITZI: "SPLITZI",
  ODD_EVEN: "ODD_EVEN",
  MISSINGZI: "MISSINGZI",
  PAIRS_ONLY: "PAIRS_ONLY",
  PYRAMID: "PYRAMID",
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];

interface GameModeDetails {
  name: string;
  description: string;
  category: string;
}

export const GameModeInfo: Record<GameMode, GameModeDetails> = {
  [GameMode.STANDARD]: {
    name: "Standard Tenzi",
    description: "Roll and hold until all dice show the same number.",
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.MEGA_TENZI]: {
    name: "Mega Tenzi",
    description: "Play with 20 dice instead of 10 for double the fun!",
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.HIGH_ROLLER]: {
    name: "High Roller",
    description: "Get all dice to show 6s only.",
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.LOW_ROLLER]: {
    name: "Low Roller",
    description: "Get all dice to show 1s only.",
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.SPEED_TENZI]: {
    name: "Speed Tenzi",
    description:
      "Roll as fast as possible to get all dice to show the same number.",
    category: GameModeCategories.classicSpeedy,
  },
  [GameMode.SPLITZI]: {
    name: "Splitzi",
    description: "Get 5 dice showing one number and 5 dice showing another.",
    category: GameModeCategories.patternLogic,
  },
  [GameMode.ODD_EVEN]: {
    name: "Odd/Even",
    description: "Roll until all dice show either odd or even numbers.",
    category: GameModeCategories.patternLogic,
  },
  [GameMode.MISSINGZI]: {
    name: "Missingzi",
    description: "Go for 9 of one number, leaving one die out.",
    category: GameModeCategories.patternLogic,
  },
  [GameMode.PAIRS_ONLY]: {
    name: "Pairs Only",
    description: "Get 5 pairs of matching numbers",
    category: GameModeCategories.patternLogic,
  },
  [GameMode.PYRAMID]: {
    name: "Pyramid",
    description:
      "Get 1 die showing 1, 2 showing 2s, 3 showing 3s, 4 showing 4s",
    category: GameModeCategories.patternLogic,
  },
};
