import type { IDie } from "../utils/interfaces";

export const generateRandomDiceArray = (): IDie[] => {
  return Array.from({ length: 10 }, () => ({
    id: crypto.randomUUID(),
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
  }));
};

export const checkClassicWin = (dice: IDie[]): boolean => {
  const firstValue = dice[0].value;
  return dice.every((die) => die.isHeld && die.value === firstValue);
};
