import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCardTitle } from "../../redux/timerSlice";

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
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("card-title-input"));

    dispatch(updateCardTitle({ id: cardId, newTitle: title }));
    setOpen(false);
  };

  return (
    <div>
      <Button sx={{ maxWidth: 45, minWidth: 0 }} onClick={() => setOpen(true)}>
        <SettingsIcon />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(true)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style} component="form" onSubmit={(e) => onSubmitHandler(e)}>
          <Typography
            id="modal-title"
            variant="h5"
            sx={{ textAlign: "center" }}
            gutterBottom
          >
            Settings
          </Typography>
          <TextField
            sx={{ marginBottom: 1 }}
            size="small"
            fullWidth
            defaultValue={cardTitle}
            label="Card Title"
            variant="outlined"
            autoComplete="off"
            name="card-title-input"
            id="card-title-input"
          />
          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent={"space-between"}
          >
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
