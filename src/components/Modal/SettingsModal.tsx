import * as React from "react";
import { Box, Button, Typography, Modal, Stack } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  cardId: number;
}

export default function SettingsModal({ cardId }: Props) {
  const cardTitle = useSelector(
    (state: RootState) => state.timer.cards[cardId].title
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sx={{ maxWidth: 45, minWidth: 0 }} onClick={handleOpen}>
        <SettingsIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ textAlign: "center" }}
          >
            Settings
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {cardTitle}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent={"space-between"}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
