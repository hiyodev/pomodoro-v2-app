import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";

import { useState } from "react";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const TopBar = ({ darkMode, setDarkMode }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flex: 1 }}>
          Hiyo Pomodoro V2
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="more settings"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{ textAlign: "right" }}
          >
            <MenuItem>
              <ThemeToggleSwitch
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
              <Typography sx={{ marginLeft: -2 }}>Toggle Theme</Typography>
            </MenuItem>
            <MenuItem>
              <AddCardIcon color="inherit" />
              <Typography sx={{ marginLeft: 2 }}>Add Timer Card</Typography>
            </MenuItem>
            <MenuItem>
              <NotificationsActiveIcon color="inherit" />
              <Typography sx={{ marginLeft: 2 }}>Notifications On</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
