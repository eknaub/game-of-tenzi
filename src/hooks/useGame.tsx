import { useState } from "react";

export interface IDie {
  id: string;
  value: number;
  isHeld: boolean;
}

function useGame() {
  const generateRandomDiceArray = (): IDie[] => {
    return Array.from({ length: 10 }, () => ({
      id: crypto.randomUUID(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  };

  const [dice, setDice] = useState<IDie[]>(generateRandomDiceArray());

  const hasUserWon = () => {
    const firstValue = dice[0].value;
    return dice.every((die) => die.isHeld && die.value === firstValue);
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
  };

  const startNewGame = () => {
    setDice(generateRandomDiceArray());
  };

  return { dice, holdDie, won, rollDice, startNewGame };
}

export default useGame;
