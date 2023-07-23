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
import {
  updateCardTitle,
  deleteCard,
  updateTimer,
} from "../../redux/timerSlice";

import { useState, FormEvent, ChangeEvent } from "react";
import { convertDurationIntoMinutes } from "../../utils/utils";

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
  const cardUUID = useSelector(
    (state: RootState) => state.timer.cards[cardId].id
  );
  const pomoDuration = useSelector(
    (state: RootState) => state.timer.cards[cardId].timer.pomodoro
  );
  const shortBreakDuration = useSelector(
    (state: RootState) => state.timer.cards[cardId].timer.shortBreak
  );
  const longBreakDuration = useSelector(
    (state: RootState) => state.timer.cards[cardId].timer.longBreak
  );
  const cardCount = useSelector((state: RootState) => state.timer.cards.length);

  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [timerSettings, setTimerSettings] = useState({
    pomodoro: pomoDuration.new,
    shortBreak: shortBreakDuration.new,
    longBreak: longBreakDuration.new,
  });

  const onTimerSettingsHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (+e.target.value < 1) {
      return;
    }
    setTimerSettings((oldSettings) => {
      oldSettings[type as keyof typeof oldSettings] =
        Number(e.target.value) * 60;
      return { ...oldSettings };
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("card-title-input"));
    const pomodoro = Number(input.get("pomodoro-min-input")) * 60;
    const shortBreak = Number(input.get("shortbreak-min-input")) * 60;
    const longBreak = Number(input.get("longbreak-min-input")) * 60;

    dispatch(updateCardTitle({ id: cardId, newTitle: title }));
    dispatch(updateTimer({ id: cardId, pomodoro, shortBreak, longBreak }));
    setOpen(false);
  };

  const onConfirmHandler = () => {
    dispatch(deleteCard(cardUUID));

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
            sx={{ textAlign: "center", marginBottom: 4 }}
          >
            Settings
          </Typography>
          <TextField
            sx={{ marginBottom: 2 }}
            size="small"
            fullWidth
            defaultValue={cardTitle}
            label="Card Title"
            variant="outlined"
            autoComplete="off"
            name="card-title-input"
            id="card-title-input"
          />
          <Typography id="pomodoro-title">Pomodoro</Typography>
          <TextField
            sx={{ marginBottom: 2, marginTop: 2 }}
            fullWidth
            type="number"
            size="small"
            value={convertDurationIntoMinutes(timerSettings.pomodoro)}
            onChange={(e) => onTimerSettingsHandler(e, "pomodoro")}
            label="Minutes"
            variant="outlined"
            autoComplete="off"
            name="pomodoro-min-input"
            id="pomodoro-min-input"
          />
          <Typography id="pomodoro-title">Short Break</Typography>
          <TextField
            sx={{ marginBottom: 2, marginTop: 2 }}
            fullWidth
            type="number"
            size="small"
            value={convertDurationIntoMinutes(timerSettings.shortBreak)}
            onChange={(e) => onTimerSettingsHandler(e, "shortBreak")}
            label="Minutes"
            variant="outlined"
            autoComplete="off"
            name="shortbreak-min-input"
            id="shortbreak-min-input"
          />
          <Typography id="pomodoro-title">Long Break</Typography>
          <TextField
            sx={{ marginBottom: 2, marginTop: 2 }}
            fullWidth
            type="number"
            size="small"
            value={convertDurationIntoMinutes(timerSettings.longBreak)}
            onChange={(e) => onTimerSettingsHandler(e, "longBreak")}
            label="Minutes"
            variant="outlined"
            autoComplete="off"
            name="longbreak-min-input"
            id="longbreak-min-input"
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
