import { Button, Divider, IconButton, styled, Typography } from "@mui/material";
import Die from "./Die";
import { useGameStore } from "../stores/useGameStore";
import { useEffect, useState, type MouseEvent } from "react";
import GameResultDialog from "../shared/components/GameResultDialog";
import { GameModifier } from "../utils/gameModifierEnums";
import { GameMode, GameModeInfo } from "../utils/gameModeEnums";
import GameModeInfoPopover from "./GameModeInfoPopover";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

const DiceBoard = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(1),
}));

const ActionBar = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const GameBoardContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const CustomDivider = styled(Divider)(() => ({
  background: "black",
  opacity: 0.8,
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
  const gameModeInfo = GameModeInfo[selectedGameMode as GameMode];
  const won = useGameStore((state) => state.hasUserWon());
  const currentGameInfo = useGameStore((state) => state.getGameInformation());
  const selectedGameModeNeedsTimer = selectedGameMode === "SPEED_TENZI";
  const isUnholdDisabled = selectedModifiers.includes(GameModifier.NO_REROLLS);

  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const isPopoverVisible = Boolean(popoverAnchor);

  const onPopoverButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  const onPopoverClose = () => {
    setPopoverAnchor(null);
  };

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
    <GameBoardContainer>
      <GameResultDialog
        open={won}
        title="🎉 You Won!"
        message={getGameResultText()}
        buttonText="Play Again"
        handleClose={resetGame}
      />
      <Header>
        <Typography variant="h4" color="textPrimary">
          {gameModeInfo.name}
        </Typography>
        <IconButton aria-label="Game Mode Info" onClick={onPopoverButtonClick}>
          <InfoOutlineIcon />
        </IconButton>
      </Header>
      <GameModeInfoPopover
        open={isPopoverVisible}
        anchorEl={popoverAnchor}
        onClose={onPopoverClose}
      />
      <Typography variant="h6" color="textPrimary" gutterBottom>
        {currentGameInfo}
      </Typography>
      <CustomDivider />
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
      <CustomDivider />
      {!won && (
        <>
          <Button
            variant="contained"
            onClick={rollDice}
            aria-label="Roll new dice"
          >
            Roll
          </Button>
          <ActionBar>
            <Button
              variant="contained"
              onClick={restartGame}
              aria-label="Restart this mode with new dice"
              fullWidth
            >
              New Game (Same Mode)
            </Button>
            <Button
              variant="contained"
              onClick={resetGame}
              aria-label="Reset current game state"
              fullWidth
            >
              Clear Board
            </Button>
          </ActionBar>
        </>
      )}
    </GameBoardContainer>
  );
}

export default GameBoard;
