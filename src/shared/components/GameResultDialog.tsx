import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface GameResultDialogProps {
  open: boolean;
  title?: string;
  message: string;
  buttonText?: string;
  handleClose: () => void;
}

function GameResultDialog(props: Readonly<GameResultDialogProps>) {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.handleClose}>
          {props.buttonText || "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameResultDialog;
