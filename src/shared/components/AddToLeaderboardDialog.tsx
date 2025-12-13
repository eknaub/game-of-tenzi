import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useLeaderboardStore } from "../../stores/useLeaderboardStore";
import { useState } from "react";
import { useGameStore } from "../../stores/useGameStore";

interface AddToLeaderboardDialogProps {
  open: boolean;
  handleClose: () => void;
}

function AddToLeaderboardDialog(props: Readonly<AddToLeaderboardDialogProps>) {
  const { score } = useGameStore();
  const { addToLeaderboard } = useLeaderboardStore();
  const [name, setName] = useState<string>("");

  const handleAddToLeaderboard = () => {
    if (name.trim() === "") return;
    addToLeaderboard({ name: name.trim(), score });
    setName("");
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>🎉 You Won!</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="body1">
            {`Congratulations! Your score is ${score}. You can add your name to the leaderboard below.`}
          </Typography>
          <TextField
            autoFocus
            label="Player Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            slotProps={{
              htmlInput: {
                maxLength: 20,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleAddToLeaderboard}
          disabled={name.trim() === ""}
        >
          Add to leaderboard
        </Button>
        <Button variant="outlined" onClick={props.handleClose}>
          Play again
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddToLeaderboardDialog;
