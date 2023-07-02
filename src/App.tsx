import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TopBar } from "./components/TopBar/TopBar";
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

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Container maxWidth="sm">
          <h1>Hello</h1>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
