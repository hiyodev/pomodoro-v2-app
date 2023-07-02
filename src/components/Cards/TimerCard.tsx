import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export interface Props {}

export function TimerCard(props: Props) {
  return (
    <Box mt={2} mb={2}>
      <Card variant="outlined">
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h2">00:00</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
