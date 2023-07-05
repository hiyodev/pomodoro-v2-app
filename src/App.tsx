import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TopBar } from "./components/TopBar/TopBar";
import { TimerCardList } from "./components/Cards/TimerCardList";
import { useState } from "react";

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

const App = (): JSX.Element => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Container maxWidth="md">
          <TimerCardList />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
