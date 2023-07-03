import { Box, Card, CardContent, Typography } from "@mui/material";
import * as React from "react";

// tsrpfc

export const ProjectList = () => {
  return (
    <Box mt={2} mb={2}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Projects</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
