import { useState } from "react";
import type { IDie } from "../utils/interfaces";
import type { GameMode } from "../utils/enums";
import { checkClassicWin } from "./winConditionHelperFunctions";

function useGame() {
  const generateRandomDiceArray = (): IDie[] => {
    return Array.from({ length: 10 }, () => ({
      id: crypto.randomUUID(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  };

  const [dice, setDice] = useState<IDie[]>(generateRandomDiceArray());
  const [rollCount, setRollCount] = useState<number>(0);
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | string>(
    ""
  );
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const hasUserWon = () => {
    switch (selectedGameMode) {
      case "STANDARD":
        return checkClassicWin(dice);
      default:
        return false;
    }
  };
  const won = hasUserWon();

  const holdDie = (id: string) => {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  };

  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
    setRollCount((count) => count + 1);
  };

  const startNewGame = () => {
    setDice(generateRandomDiceArray());
  };

  const updateGameMode = (mode: GameMode) => {
    setSelectedGameMode(mode);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewGame();
    setRollCount(0);
  };

  const resetGame = () => {
    setSelectedGameMode("");
    setGameStarted(false);
  };

  return {
    dice,
    holdDie,
    won,
    rollDice,
    rollCount,
    selectedGameMode,
    updateGameMode,
    gameStarted,
    startGame,
    resetGame,
  };
}

export default useGame;
