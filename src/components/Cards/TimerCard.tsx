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

export function TimerCard() {
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(0);

  useEffect(() => {
    console.log(Date.now());
    let timeNow: number | null = null;
    let timeInterval: number | undefined;

    if (timerStarted) {
      timeNow = Date.now();
      timeInterval = setInterval(() => console.log("Hi"), 1000);
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
          <Typography variant="h1">{timerDuration}</Typography>
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
