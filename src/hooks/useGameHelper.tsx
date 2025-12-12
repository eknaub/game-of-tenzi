import type { IDie } from "../utils/interfaces";

export const generateRandomDiceArray = (diceCount?: number): IDie[] => {
  return Array.from({ length: diceCount ?? 10 }, () => ({
    id: crypto.randomUUID(),
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
  }));
};

export const checkClassicWin = (dice: IDie[]): boolean => {
  const firstValue = dice[0].value;
  return dice.every((die) => die.isHeld && die.value === firstValue);
};

export const checkHighRollerWin = (dice: IDie[]): boolean => {
  return dice.every((die) => die.isHeld && die.value === 6);
};

export const checkLowRollerWin = (dice: IDie[]): boolean => {
  return dice.every((die) => die.isHeld && die.value === 1);
};
