import { Typography } from "@mui/material";
import "./App.css";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Game of Tenzi
      </Typography>
      <GameBoard />
    </>
  );
}

export default App;
