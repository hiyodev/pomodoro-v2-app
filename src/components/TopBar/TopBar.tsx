import { AppBar, Toolbar, Typography } from "@mui/material";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const TopBar = ({ darkMode, setDarkMode }: Props): JSX.Element => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Hiyo Pomodoro V2
        </Typography>
        <ThemeToggleSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </Toolbar>
    </AppBar>
  );
};
