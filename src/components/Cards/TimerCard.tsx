import * as React from "react";
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
          <Typography variant="h5" gutterBottom>
            Working on Projects
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Button>Focus</Button>
            <Button>Break</Button>
          </Stack>
          <Typography variant="h1">00:00</Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained">Start</Button>
            <Button variant="outlined">Reset</Button>
          </Stack>
        </CardContent>
      </Card>
      <ProjectList />
    </Box>
  );
}
