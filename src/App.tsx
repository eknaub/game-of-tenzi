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
import { GameMode, GameModeCategories, GameModeInfo } from "./utils/enums";
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

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(16),
  color: "black",
  backgroundColor: "lightgray",
  lineHeight: theme.spacing(5),
}));

function App() {
  const { selectedGameMode, updateGameMode, gameStarted, startGame } =
    useGameStore();

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
              <InputLabel>Select Game Mode</InputLabel>
              <Select
                value={selectedGameMode}
                label="Game Mode"
                onChange={(e) => updateGameMode(e.target.value as GameMode)}
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
            <Button
              variant="contained"
              onClick={startGame}
              aria-label="Start the game"
              disabled={selectedGameMode === ""}
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
