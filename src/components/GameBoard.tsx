import { Button, styled, Typography } from "@mui/material";
import Die from "./Die";
import { useGameStore } from "../stores/useGameStore";
import { useEffect } from "react";
import GameResultDialog from "../shared/components/GameResultDialog";
import { GameModifier } from "../utils/gameModifierEnums";

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
    restartGame,
    selectedModifiers,
    score,
    calculateAndSetScore,
  } = useGameStore();
  const won = useGameStore((state) => state.hasUserWon());
  const headerText = useGameStore((state) => state.getHeaderText());
  const selectedGameModeNeedsTimer = selectedGameMode === "SPEED_TENZI";
  const isUnholdDisabled = selectedModifiers.includes(GameModifier.NO_REROLLS);

  useEffect(() => {
    if (won) {
      calculateAndSetScore();
    }
  }, [won, calculateAndSetScore]);

  useEffect(() => {
    if (!selectedGameModeNeedsTimer) return;

    const interval = setInterval(() => {
      if (!won) {
        incrementSecondsElapsed();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [won, incrementSecondsElapsed, selectedGameModeNeedsTimer]);

  const getGameResultText = () => {
    const isCompetitiveMode = selectedModifiers.includes(
      GameModifier.COMPETITIVE_MODE
    );

    if (isCompetitiveMode) {
      return `Score: ${score} pts | ${rollCount} rolls${
        selectedGameModeNeedsTimer ? ` | ${secondsElapsed}s` : ""
      }`;
    }

    if (selectedGameModeNeedsTimer) {
      return `Completed in ${rollCount} rolls and ${secondsElapsed} seconds!`;
    }

    return `Completed in ${rollCount} rolls!`;
  };

  return (
    <>
      <GameResultDialog
        open={won}
        title="🎉 You Won!"
        message={getGameResultText()}
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
              if (die.isHeld && isUnholdDisabled) {
                return;
              }

              if (!won) {
                holdDie(die.id);
              }
            }}
          />
        ))}
      </DiceBoard>
      {!won && (
        <>
          <Button
            variant="contained"
            onClick={rollDice}
            aria-label="Roll new dice"
          >
            Roll
          </Button>
          <Button
            variant="contained"
            onClick={restartGame}
            aria-label="Restart game"
          >
            Restart
          </Button>
        </>
      )}
    </>
  );
}

export default GameBoard;
