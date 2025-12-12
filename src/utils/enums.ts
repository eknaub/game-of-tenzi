export const GameModeCategories = {
  classicSpeedy: "Classic & Speedy",
  patternLogic: "Pattern & Logic",
  rollLimit: "Roll Limit Modes",
  multiplier: "Multiplier Modes",
  competitive: "Competitive Modes",
};

export const GameMode = {
  STANDARD: "STANDARD",
  MEGA_TENZI: "MEGA_TENZI",
  HIGH_ROLLER: "HIGH_ROLLER",
  LOW_ROLLER: "LOW_ROLLER",
  SPEED_TENZI: "SPEED_TENZI",
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];

export const GameModeInfo = {
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
};
