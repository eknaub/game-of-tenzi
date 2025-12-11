export const GameModeCategories = {
  classicSpeedy: "Classic & Speedy",
  patternLogic: "Pattern & Logic",
  rollLimit: "Roll Limit Modes",
  multiplier: "Multiplier Modes",
  competitive: "Competitive Modes",
};

export const GameMode = {
  STANDARD: "STANDARD",
} as const;

export type GameMode = (typeof GameMode)[keyof typeof GameMode];

export const GameModeInfo = {
  [GameMode.STANDARD]: {
    name: "Standard Tenzi",
    description: "Roll until all dice show the same number.",
    category: GameModeCategories.classicSpeedy,
  },
};
