import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import ThemeToggleSwitch from "../Buttons/ThemeToggleSwitch";
import AddCardIcon from "@mui/icons-material/AddCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Redux
import { useDispatch } from "react-redux";

import { useState } from "react";
import { addCard } from "../../redux/timerSlice";

interface Props {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const TopBar = ({ darkMode, setDarkMode }: Props): JSX.Element => {
  const dispatch = useDispatch();

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
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(addCard());
                handleClose();
              }}
            >
              <AddCardIcon color="inherit" />
              <Typography sx={{ marginLeft: 2 }}>Add Timer Card</Typography>
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
