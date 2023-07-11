import {
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { ConfirmationModal } from "./ConfirmationModal";

// Redux
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateCardTitle, deleteCard } from "../../redux/timerSlice";

import { useState, FormEvent } from "react";

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

export const SettingsModal = ({ cardId }: Props) => {
  const dispatch = useDispatch();
  const cardTitle = useSelector(
    (state: RootState) => state.timer.cards[cardId].title
  );
  const cardCount = useSelector((state: RootState) => state.timer.cards.length);

  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<boolean>(false);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("card-title-input"));

    dispatch(updateCardTitle({ id: cardId, newTitle: title }));
    setOpen(false);
  };

  const onConfirmHandler = () => {
    dispatch(deleteCard(cardId));

    // Close confirmation and setting modals
    setModalState(false);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Card settings">
        <Button
          sx={{ maxWidth: 45, minWidth: 0 }}
          onClick={() => setOpen(true)}
        >
          <SettingsIcon />
        </Button>
      </Tooltip>
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
          <Stack>
            {cardCount > 1 && (
              <Button color="warning" onClick={() => setModalState(true)}>
                Delete This Card
              </Button>
            )}
            <ConfirmationModal
              modalState={modalState}
              setModalState={setModalState}
              onConfirmHandler={onConfirmHandler}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            mt={2}
            justifyContent={"space-between"}
          >
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
