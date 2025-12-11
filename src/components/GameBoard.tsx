import { Button, styled } from "@mui/material";
import useGame from "../hooks/useGame";
import Die from "./Die";

const GameBoardContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#F5F5F5",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),
  alignItems: "center",
}));

function GameBoard() {
  const { dice, holdDie, won, rollDice, startNewGame } = useGame();

  return (
    <GameBoardContainer>
      {dice.map((die) => (
        <Die
          key={die.id}
          die={die}
          holdDie={() => {
            if (!won) {
              holdDie(die.id);
            }
          }}
        />
      ))}
      {!won ? (
        <Button variant="contained" onClick={rollDice}>
          Roll
        </Button>
      ) : (
        <Button variant="contained" onClick={startNewGame}>
          New Game
        </Button>
      )}
    </GameBoardContainer>
  );
}

export default GameBoard;
