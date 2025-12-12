import { styled } from "@mui/material";
import type { IDie } from "../utils/interfaces";

const DieStyled = styled("div")<{ isHeld: boolean }>(({ isHeld, theme }) => ({
  color: "black",
  border: "1px solid #ccc",
  boxShadow: isHeld ? "0 0 2px black" : "none",
  backgroundColor: isHeld ? "yellow" : "white",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  cursor: "pointer",
  fontSize: theme.typography.h4.fontSize,
  textAlign: "center",
}));

interface DieProps {
  die: IDie;
  holdDie: () => void;
}

function Die(props: Readonly<DieProps>) {
  return (
    <DieStyled
      isHeld={props.die.isHeld}
      onClick={props.holdDie}
      aria-label={`Die with value ${props.die.value}, ${
        props.die.isHeld ? "held" : "not held"
      }`}
    >
      {props.die.value}
    </DieStyled>
  );
}

export default Die;
