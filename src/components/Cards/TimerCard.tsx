import { useEffect, useState } from "react";
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

/*
Store Project List and Task List in Redux
Store timeNow so that if user closes browser and 
comes back 5 mins later, it will reflect the correct time
*/

export function TimerCard() {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(3600);

  useEffect(() => {
    let timeNow: number = 0;
    let timeInterval: number | undefined;

    if (timerStarted) {
      timeNow = Date.now();
      timeInterval = setInterval(
        () =>
          setTimerDuration(
            timerDuration - Math.floor((Date.now() - timeNow) / 1000)
          ),
        1000
      );
    }

    return () => clearInterval(timeInterval);
  }, [timerStarted]);

  const onTimerStateChange = () => {
    setTimerStarted((prevState) => !prevState);
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
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button>Focus</Button>
            <Button>Break</Button>
          </Stack>
          <Typography variant="h1">
            {secondsIntoTimer(timerDuration)}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" onClick={onTimerStateChange}>
              {timerStarted ? "Pause" : "Start"}
            </Button>
            <Button variant="outlined" onClick={onTimerStateChange}>
              Reset
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <ProjectList />
    </Box>
  );
}
