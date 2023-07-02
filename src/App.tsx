import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TopBar } from "./components/TopBar/TopBar";
import { useState } from "react";
import { TimerCard } from "./components/Cards/TimerCard";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Container maxWidth="xs">
          <TimerCard />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
