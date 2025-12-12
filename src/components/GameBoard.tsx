import { Button, styled, Typography } from "@mui/material";
import Die from "./Die";
import { useGameStore } from "../stores/useGameStore";
import { useEffect } from "react";
import GameResultDialog from "../shared/components/GameResultDialog";

const DiceBoard = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),
}));

function GameBoard() {
  const {
    dice,
    holdDie,
    rollDice,
    resetGame,
    rollCount,
    secondsElapsed,
    incrementSecondsElapsed,
    selectedGameMode,
  } = useGameStore();
  const won = useGameStore((state) => state.hasUserWon());
  const selectedGameModeNeedsTimer = selectedGameMode === "SPEED_TENZI";

  useEffect(() => {
    if (!selectedGameModeNeedsTimer) return;

    const interval = setInterval(() => {
      if (!won) {
        incrementSecondsElapsed();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [won, incrementSecondsElapsed, selectedGameModeNeedsTimer]);

  const headerText = `Rolls: ${rollCount} ${
    selectedGameModeNeedsTimer ? `| ${secondsElapsed}s` : ""
  }`;

  const gameResultText = selectedGameModeNeedsTimer
    ? `Completed in ${rollCount} rolls and ${secondsElapsed} seconds!`
    : `Completed in ${rollCount} rolls!`;

  return (
    <>
      <GameResultDialog
        open={won}
        title="🎉 You Won!"
        message={gameResultText}
        buttonText="Play Again"
        handleClose={resetGame}
      />
      <Typography variant="h6" color="textPrimary">
        {headerText}
      </Typography>
      <DiceBoard>
        {dice.map((die) => (
          <Die
            key={die.id}
            die={die}
            holdDie={() => {
              if (!won) {
                holdDie(die.id);
              }
            }}
          />
        ))}
      </DiceBoard>
      {!won && (
        <Button
          variant="contained"
          onClick={rollDice}
          aria-label="Roll new dice"
        >
          Roll
        </Button>
      )}
    </>
  );
}

export default GameBoard;
