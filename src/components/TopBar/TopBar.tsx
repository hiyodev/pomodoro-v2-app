import { AppBar, Toolbar, Typography } from "@mui/material";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";
import { themeProps } from "../../shared/interfaces/interfaces";
import { useState } from "react";

export function TopBar({ darkMode, setDarkMode }: themeProps) {
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
}
