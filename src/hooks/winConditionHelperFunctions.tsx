import type { IDie } from "../utils/interfaces";

export const checkClassicWin = (dice: IDie[]): boolean => {
  const firstValue = dice[0].value;
  return dice.every((die) => die.isHeld && die.value === firstValue);
};
