import {
  Button,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { GameMode, GameModeInfo } from "./utils/gameModeEnums";
import GameInfoBox from "./components/GameInfoBox";
import { useGameStore } from "./stores/useGameStore";
import GameModifierBox from "./components/GameModifierBox";

const GameBoardContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  display: "grid",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(16),
  color: "black",
  backgroundColor: "lightgray",
  lineHeight: theme.spacing(5),
}));

function App() {
  const {
    selectedGameMode,
    updateGameMode,
    gameStarted,
    startGame,
    targetNumber,
    setTargetNumber,
  } = useGameStore();

  const groupedModes = Object.entries(GameModeInfo).reduce(
    (acc, [modeKey, modeInfo]) => {
      if (!acc[modeInfo.category]) {
        acc[modeInfo.category] = [];
      }
      acc[modeInfo.category].push([modeKey, modeInfo]);
      return acc;
    },
    {} as Record<string, [string, (typeof GameModeInfo)[GameMode]][]>
  );

  const isNewGameDisabled = () => {
    switch (selectedGameMode) {
      case "TARGET_TENZI": {
        return selectedGameMode === "TARGET_TENZI" && targetNumber === 0;
      }
      default:
        return selectedGameMode === "";
    }
  };

  return (
    <>
      {!gameStarted && (
        <Typography variant="h3" gutterBottom>
          Game of Tenzi
        </Typography>
      )}
      <GameBoardContainer>
        {!gameStarted && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              style={{
                textAlign: "center",
              }}
            >
              Select a Game Mode
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Select Game Mode</InputLabel>
              <Select
                value={selectedGameMode}
                label="Game Mode"
                onChange={(e) => updateGameMode(e.target.value)}
                aria-label="Select game mode"
              >
                {Object.entries(groupedModes).map(([category, modes]) => [
                  <StyledListSubheader key={category}>
                    {category}
                  </StyledListSubheader>,
                  ...modes.map(([modeKey, modeInfo]) => (
                    <MenuItem
                      key={modeKey}
                      value={modeKey}
                      aria-label={`Game mode ${modeInfo.name}`}
                    >
                      {modeInfo.name}
                    </MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>
            {selectedGameMode === "TARGET_TENZI" && (
              <FormControl fullWidth>
                <InputLabel>Select target number</InputLabel>
                <Select
                  value={targetNumber}
                  label="Target number"
                  onChange={(e) => setTargetNumber(e.target.value)}
                  aria-label="Select target mode for game mode"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <MenuItem
                      key={num}
                      value={num}
                      aria-label={`Target number ${num}`}
                    >
                      {num}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <GameModifierBox />
            <Button
              variant="contained"
              onClick={startGame}
              aria-label="Start the game"
              disabled={isNewGameDisabled()}
            >
              Start Game
            </Button>
          </>
        )}
        {gameStarted && (
          <>
            <GameInfoBox />
            <GameBoard />
          </>
        )}
      </GameBoardContainer>
    </>
  );
}

export default App;
