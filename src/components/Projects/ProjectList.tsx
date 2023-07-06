import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
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
          {openInput && (
            <>
              <TextField
                sx={{ marginBottom: 1 }}
                required
                hiddenLabel
                fullWidth
                variant="outlined"
                autoComplete="off"
                id="project-title-input"
                placeholder="What are you working on?"
              />
              <TextField
                fullWidth
                hiddenLabel
                variant="outlined"
                id="project-details-input"
                placeholder="Additional Info about task..."
                multiline
                rows={3}
              />
              <Stack direction="row" spacing={2} mt={2}>
                <Button>Checklist</Button>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained">Save</Button>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
