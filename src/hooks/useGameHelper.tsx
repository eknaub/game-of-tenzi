import { GameModeInfo, type GameMode } from "../utils/gameModeEnums";
import { GameModifier, GameModifierInfo } from "../utils/gameModifierEnums";
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

export const checkTargetWin = (dice: IDie[], target: number): boolean => {
  return dice.every((die) => die.isHeld && die.value === target);
};

export const checkTargetSumWin = (dice: IDie[]): boolean => {
  const sum = dice.reduce((acc, die) => acc + die.value, 0);
  return dice.every((die) => die.isHeld) && sum === 30;
};

export const calculateCompetitiveScore = (
  selectedModifiers: GameModifier[],
  rollCount: number,
  secondsElapsed: number,
  selectedGameMode: GameMode | ""
): number => {
  const isCompetitiveModeActivated = selectedModifiers.includes(
    GameModifier.COMPETITIVE_MODE
  );

  if (!isCompetitiveModeActivated) {
    return 0;
  }

  let points = GameModifierInfo.COMPETITIVE_MODE.score; //Base win score

  //Competitive scores (roll and time efficiency)
  points += 200 - rollCount * 5 - secondsElapsed * 2;

  //Modifier scores
  if (selectedModifiers.includes(GameModifier.ECONOMY) && rollCount < 15) {
    points += GameModifierInfo.ECONOMY.score;
  }
  if (selectedModifiers.includes(GameModifier.GIGA_ECONOMY) && rollCount < 10) {
    points += GameModifierInfo.GIGA_ECONOMY.score;
  }
  if (selectedModifiers.includes(GameModifier.NO_REROLLS)) {
    points += GameModifierInfo.NO_REROLLS.score;
  }

  //Game mode scores
  if (selectedGameMode) {
    points += GameModeInfo[selectedGameMode].score;
  }

  return points;
};
