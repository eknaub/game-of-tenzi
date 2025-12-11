import { Button, styled, Typography } from "@mui/material";
import useGame from "../hooks/useGame";
import Die from "./Die";

const DiceBoard = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: theme.spacing(2),
}));

function GameBoard() {
  const { dice, holdDie, won, rollDice, resetGame, rollCount } = useGame();

  return (
    <>
      <Typography variant="h4" color="textPrimary">
        Roll Count: {rollCount}
      </Typography>
      <DiceBoard>
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
      </DiceBoard>
      {!won ? (
        <Button variant="contained" onClick={rollDice}>
          Roll
        </Button>
      ) : (
        <Button variant="contained" onClick={resetGame}>
          New Game
        </Button>
      )}
    </>
  );
}

export default GameBoard;
