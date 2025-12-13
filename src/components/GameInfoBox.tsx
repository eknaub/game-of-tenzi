import { styled, Typography } from "@mui/material";
import { useGameStore } from "../stores/useGameStore";
import { GameMode, GameModeInfo } from "../utils/gameModeEnums";

const GameInfoBoxContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow: theme.shadows[2],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

function GameInfoBox() {
  const { selectedGameMode } = useGameStore();
  const gameModeInfo = GameModeInfo[selectedGameMode as GameMode];
  return (
    <GameInfoBoxContainer>
      <Typography variant="h4" color="textPrimary">
        {gameModeInfo.name}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {gameModeInfo.category}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {gameModeInfo.description}
      </Typography>
    </GameInfoBoxContainer>
  );
}

export default GameInfoBox;
