import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { ProjectList } from "../Projects/ProjectList";
import { secondsIntoTimer } from "../../utils/utils";
import { useEffect } from "react";

// Redux
import type { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setPomoTimer,
  setShortBreakTimer,
  setLongBreakTimer,
  toggleTimerState,
  toggleTimerMode,
  stopTimer,
  resetTimer,
} from "../../redux/timerSlice";
import SettingsModal from "../Modal/SettingsModal";

interface Props {
  cardId: number;
  title: string;
}

export const TimerCard = ({ cardId, title }: Props): JSX.Element => {
  const { type, started } = useSelector(
    (state: RootState) => state.timer.cards[cardId].timer
  );
  const { pomodoro, shortBreak, longBreak } = useSelector(
    (state: RootState) => state.timer.cards[cardId].timer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let timeNow: number = 0;
    let timeInterval: number | undefined;

    if (started) {
      timeNow = Date.now();
      timeInterval = setInterval(() => {
        if (type === "pomodoro") {
          dispatch(
            setPomoTimer({
              id: cardId,
              time:
                pomodoro.duration - Math.floor((Date.now() - timeNow) / 1000),
            })
          );
        } else if (type === "shortbreak") {
          dispatch(
            setShortBreakTimer({
              id: cardId,
              time:
                shortBreak.duration - Math.floor((Date.now() - timeNow) / 1000),
            })
          );
        } else if (type === "longbreak") {
          dispatch(
            setLongBreakTimer({
              id: cardId,
              time:
                longBreak.duration - Math.floor((Date.now() - timeNow) / 1000),
            })
          );
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [started]);

  const onTimerStateChange = (): void => {
    dispatch(toggleTimerState(cardId));
  };

  const onTimerReset = (): void => {
    dispatch(resetTimer(cardId));
    dispatch(stopTimer(cardId));
  };

  const onTimerModeChange = (
    type: "pomodoro" | "shortbreak" | "longbreak"
  ): void => {
    dispatch(stopTimer(cardId));
    dispatch(resetTimer(cardId));
    dispatch(toggleTimerMode({ id: cardId, mode: type }));
  };

  return (
    <Box mt={2} mb={2}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" textAlign="center" gutterBottom>
            {title}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button onClick={() => onTimerModeChange("pomodoro")}>
              Pomodoro
            </Button>
            <Button onClick={() => onTimerModeChange("shortbreak")}>
              Short Break
            </Button>
            <Button onClick={() => onTimerModeChange("longbreak")}>
              Long Break
            </Button>
          </Stack>
          <Typography variant="h1">
            {type === "pomodoro" && secondsIntoTimer(pomodoro.duration)}
            {type === "shortbreak" && secondsIntoTimer(shortBreak.duration)}
            {type === "longbreak" && secondsIntoTimer(longBreak.duration)}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={onTimerStateChange}>
              {started ? "Pause" : "Start"}
            </Button>
            <Button variant="outlined" onClick={onTimerReset}>
              Reset
            </Button>
            <SettingsModal cardId={cardId} />
          </Stack>
        </CardContent>
      </Card>
      <ProjectList />
    </Box>
  );
};
