import {
  Box,
  Button,
  Card,
  CardContent,
  Grow,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, Fragment } from "react";

// Dummy data for testing
const projectData = [
  {
    id: 1,
    title: "Test Title goes here",
    details:
      "This is just a test to see how the details will look like and to see if it wraps properly and many more details.",
    tasks: [],
  },
];

export const ProjectList = (): JSX.Element => {
  const [openInput, setOpenInput] = useState<boolean>(false);

  const projectList = projectData.map((project) => {
    return (
      <Paper
        key={project.id}
        variant="outlined"
        sx={{ padding: 2, marginBottom: 1 }}
      >
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>
        <Typography>{project.details}</Typography>
      </Paper>
    );
  });

  return (
    <Box mt={1} mb={2}>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {projectList}
          {!openInput && (
            <Button onClick={() => setOpenInput(true)}>Add Project</Button>
          )}
          {openInput && (
            <Grow in={openInput}>
              <div>
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  mt={2}
                  width="100%"
                >
                  <Button>Tasks</Button>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenInput(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained">Save</Button>
                  </Stack>
                </Stack>
              </div>
            </Grow>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
