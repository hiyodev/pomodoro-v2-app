import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export const ProjectList = (): JSX.Element => {
  const [openInput, setOpenInput] = useState(false);

  return (
    <Box mt={1} mb={2}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!openInput && (
            <Button onClick={() => setOpenInput(true)}>Add Project</Button>
          )}
          <TextField
            sx={{ marginBottom: 2 }}
            fullWidth
            variant="filled"
            autoComplete="off"
            id="project-title-input"
            placeholder="What are you working on?"
          />
          <TextField
            fullWidth
            variant="filled"
            id="project-details-input"
            multiline
            rows={3}
          />
        </CardContent>
      </Card>
    </Box>
  );
};
