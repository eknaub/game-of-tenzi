export const GameModifierCategories = {
  rollLimits: "Roll Limit Modes",
  competitive: "Competitive Scoring",
};

export const GameModifier = {
  ECONOMY: "ECONOMY",
  GIGA_ECONOMY: "GIGA_ECONOMY",
  NO_REROLLS: "NO_REROLLS",
  COMPETITIVE_MODE: "COMPETITIVE_MODE",
} as const;

export type GameModifier = (typeof GameModifier)[keyof typeof GameModifier];

interface GameModifierDetails {
  name: string;
  description: string;
  score: number;
  category: string;
}

export const GameModifierInfo: Record<GameModifier, GameModifierDetails> = {
  [GameModifier.ECONOMY]: {
    name: "Economy Mode",
    description: "Win in under 15 rolls to receive +50 pts bonus!",
    score: 50,
    category: GameModifierCategories.rollLimits,
  },
  [GameModifier.GIGA_ECONOMY]: {
    name: "Giga Economy Mode",
    description: "Win in under 10 rolls to receive +100 pts bonus!",
    score: 100,
    category: GameModifierCategories.rollLimits,
  },
  [GameModifier.NO_REROLLS]: {
    name: "No Rerolls",
    description: "Dice stay locked once held. Choose wisely for +60 pts bonus!",
    score: 60,
    category: GameModifierCategories.rollLimits,
  },
  [GameModifier.COMPETITIVE_MODE]: {
    name: "Competitive Mode",
    description:
      "Activate this mode, to receive points and earn a top spot in the leaderboards!",
    score: 200,
    category: GameModifierCategories.rollLimits,
  },
};
