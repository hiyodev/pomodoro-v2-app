import { Box, Card, CardContent, Typography } from "@mui/material";

export const ProjectList = (): JSX.Element => {
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
