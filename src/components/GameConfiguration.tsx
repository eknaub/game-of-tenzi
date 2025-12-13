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
import GameModifierBox from "./GameModifierBox";
import { useGameStore } from "../stores/useGameStore";
import { GameMode, GameModeInfo } from "../utils/gameModeEnums";

const ConfigurationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.pxToRem(16),
  color: "black",
  backgroundColor: "lightgray",
  lineHeight: theme.spacing(5),
}));

function GameConfiguration() {
  const {
    selectedGameMode,
    updateGameMode,
    startGame,
    targetNumber,
    setTargetNumber,
  } = useGameStore();
  const gameModeInfo = GameModeInfo[selectedGameMode as GameMode];

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
    <ConfigurationContainer>
      <Typography
        variant="h4"
        gutterBottom
        color="textPrimary"
        style={{
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        Configuration
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
        {selectedGameMode && (
          <Typography
            variant="body2"
            color="textPrimary"
            style={{
              fontStyle: "italic",
              marginLeft: 8,
            }}
          >
            {gameModeInfo.description}
          </Typography>
        )}
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
    </ConfigurationContainer>
  );
}

export default GameConfiguration;
