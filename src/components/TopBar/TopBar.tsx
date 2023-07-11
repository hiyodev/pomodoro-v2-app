import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";
import AddCardIcon from "@mui/icons-material/AddCard";

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
        <Button sx={{ maxWidth: 45, minWidth: 0 }}>
          <AddCardIcon />
        </Button>
        <ThemeToggleSwitch darkMode={darkMode} setDarkMode={setDarkMode} />
      </Toolbar>
    </AppBar>
  );
};
