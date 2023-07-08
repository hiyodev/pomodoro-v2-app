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
import { updateTimer, toggleTimer, stopTimer } from "../../redux/timerSlice";

interface Props {
  title: string;
}

export const TimerCard = ({ title }: Props): JSX.Element => {
  const timer = useSelector((state: RootState) => state.timer.duration);
  const timerStarted = useSelector((state: RootState) => state.timer.started);
  const dispatch = useDispatch();

  console.log("ReduxTIME", timer);

  useEffect(() => {
    let timeNow: number = 0;
    let timeInterval: number | undefined;

    if (timerStarted) {
      timeNow = Date.now();
      timeInterval = setInterval(
        () =>
          dispatch(
            updateTimer(timer - Math.floor((Date.now() - timeNow) / 1000))
          ),
        1000
      );
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [timerStarted]);

  const onTimerStateChange = () => {
    dispatch(toggleTimer());
  };

  const onTimerReset = () => {
    dispatch(updateTimer(1500));
    dispatch(stopTimer());
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
            <Button>Focus</Button>
            <Button>Break</Button>
          </Stack>
          <Typography variant="h1">{secondsIntoTimer(timer)}</Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={onTimerStateChange}>
              {timerStarted ? "Pause" : "Start"}
            </Button>
            <Button variant="outlined" onClick={onTimerReset}>
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <ProjectList />
    </Box>
  );
};
