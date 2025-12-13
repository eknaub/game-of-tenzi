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

export const checkSplitziWin = (dice: IDie[]): boolean => {
  if (!dice.every((die) => die.isHeld)) {
    return false;
  }

  const counterMap = new Map<number, number>();

  dice.forEach((elem) => {
    if (!counterMap.has(elem.value)) {
      counterMap.set(elem.value, 1);
    } else {
      counterMap.set(elem.value, counterMap.get(elem.value)! + 1);
    }
  });

  const hasWon =
    counterMap.size === 2 && [...counterMap.values()].every((val) => val === 5);

  return hasWon;
};

export const checkOddEvenWin = (dice: IDie[]): boolean => {
  const isAllOddOrEven =
    dice.every((die) => die.isHeld && die.value % 2 === 0) ||
    dice.every((die) => die.isHeld && die.value % 2 === 1);

  return isAllOddOrEven;
};

export const checkMissingziWin = (dice: IDie[]): boolean => {
  if (!dice.every((die) => die.isHeld)) {
    return false;
  }

  const counterMap = new Map<number, number>();

  dice.forEach((elem) => {
    if (!counterMap.has(elem.value)) {
      counterMap.set(elem.value, 1);
    } else {
      counterMap.set(elem.value, counterMap.get(elem.value)! + 1);
    }
  });

  const diceCounter = [...counterMap.values()];
  const hasWon =
    counterMap.size === 2 && diceCounter.includes(9) && diceCounter.includes(1);

  return hasWon;
};

export const checkPairsOnlyWin = (dice: IDie[]): boolean => {
  if (!dice.every((die) => die.isHeld)) {
    return false;
  }

  const counterMap = new Map<number, number>();

  dice.forEach((elem) => {
    if (!counterMap.has(elem.value)) {
      counterMap.set(elem.value, 1);
    } else {
      counterMap.set(elem.value, counterMap.get(elem.value)! + 1);
    }
  });

  const diceCounter = [...counterMap.values()];
  const hasWon = counterMap.size === 5 && diceCounter.every((val) => val === 2);

  return hasWon;
};

export const checkPyramidWin = (dice: IDie[]): boolean => {
  if (!dice.every((die) => die.isHeld)) {
    return false;
  }

  const counterMap = new Map<number, number>();

  dice.forEach((elem) => {
    if (!counterMap.has(elem.value)) {
      counterMap.set(elem.value, 1);
    } else {
      counterMap.set(elem.value, counterMap.get(elem.value)! + 1);
    }
  });

  const hasWon =
    counterMap.size === 4 &&
    counterMap.get(1) === 1 &&
    counterMap.get(2) === 2 &&
    counterMap.get(3) === 3 &&
    counterMap.get(4) === 4;

  return hasWon;
};
