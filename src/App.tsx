import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { GameMode, GameModeInfo } from "./utils/enums";
import GameInfoBox from "./components/GameInfoBox";
import { useGameStore } from "./stores/useGameStore";

const GameBoardContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  display: "grid",
  gap: theme.spacing(2),
  alignItems: "center",
}));

function App() {
  const { selectedGameMode, updateGameMode, gameStarted, startGame } =
    useGameStore();

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
            <Typography variant="h5" gutterBottom color="textPrimary">
              Select a Game Mode
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Game Mode</InputLabel>
              <Select
                value={selectedGameMode}
                label="Game Mode"
                onChange={(e) => updateGameMode(e.target.value as GameMode)}
                aria-label="Select game mode"
              >
                <MenuItem
                  value={""}
                  disabled
                  selected
                  aria-label="Select a mode"
                >
                  Select a mode
                </MenuItem>
                {Object.entries(GameModeInfo).map(([modeKey, modeInfo]) => (
                  <MenuItem
                    key={modeKey}
                    value={modeKey}
                    aria-label={`Game mode ${modeInfo.name}`}
                  >
                    {modeInfo.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={startGame}
              aria-label="Start the game"
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
