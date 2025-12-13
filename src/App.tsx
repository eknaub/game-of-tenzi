import { styled, Typography, Box, Container } from "@mui/material";
import "./App.css";
import GameBoard from "./components/GameBoard";
import { useGameStore } from "./stores/useGameStore";
import GameConfiguration from "./components/GameConfiguration";
import GameLeaderboard from "./components/GameLeaderboard";

const AppWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "#242424",
  backgroundSize: "400% 400%",
  padding: theme.spacing(4),
}));

const Card = styled(Box)(({ theme }) => ({
  background: "rgb(255, 255, 255)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  width: "100%",
}));

const MainContent = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  alignItems: "center",
}));

const TitleBox = styled(Box)(() => ({
  textAlign: "center",
}));

const Title = styled(Typography)(() => ({
  fontWeight: "bold",
  color: "#fff",
  textShadow: "2px 2px 4px rgba(255, 255, 255, 0.2)",
  letterSpacing: "0.05em",
}));

const GameBoardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

function App() {
  const { gameStarted } = useGameStore();

  return (
    <AppWrapper>
      <MainContent>
        <TitleBox>
          <Title variant="h2">Game of Tenzi</Title>
        </TitleBox>
        {!gameStarted && (
          <Card>
            <GameConfiguration />
          </Card>
        )}
        {gameStarted && (
          <GameBoardContainer>
            <Card>
              <GameBoard />
            </Card>
          </GameBoardContainer>
        )}
        {!gameStarted && (
          <Card>
            <GameLeaderboard />
          </Card>
        )}
      </MainContent>
    </AppWrapper>
  );
}

export default App;
