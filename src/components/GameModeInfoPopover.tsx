import { Popover, styled, Typography } from "@mui/material";
import { useGameStore } from "../stores/useGameStore";
import { GameMode, GameModeInfo } from "../utils/gameModeEnums";

const PopoverContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: "300px",
}));

interface GameModeInfoPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

function GameModeInfoPopover(props: Readonly<GameModeInfoPopoverProps>) {
  const { selectedGameMode } = useGameStore();
  const gameModeInfo = GameModeInfo[selectedGameMode as GameMode];
  return (
    <Popover
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <PopoverContent>
        <Typography variant="h5" color="textPrimary" gutterBottom>
          {gameModeInfo.category}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {gameModeInfo.description}
        </Typography>
      </PopoverContent>
    </Popover>
  );
}

export default GameModeInfoPopover;
