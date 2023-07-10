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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Dummy data for testing
const dummyData = [
  {
    id: 1,
    editMode: false,
    title: "Test Title goes here and many more title crap goes here",
    details:
      "This is just a test to see how the details will look like and to see if it wraps properly and many more details.",
    tasks: [],
  },
  {
    id: 2,
    editMode: false,
    title: "This is another test",
    details: "Let's see how this looks like when it's shorter.",
    tasks: [],
  },
];

interface Task {
  id: number;
  completed: boolean;
  details: string;
}

interface Project {
  id: number;
  editMode: boolean;
  title: string;
  details?: string;
  tasks?: Task[];
}

interface ProjectList extends Array<Project> {}

export const ProjectList = (): JSX.Element => {
  const [openInput, setOpenInput] = useState<boolean>(false);

  // Note: Don't forget to prevent data being referenced by memory for all the cards
  // IE: If card 1 changes, so will card 2 and card 3
  const [projectData, setProjectData] = useState<ProjectList>(
    JSON.parse(JSON.stringify(dummyData))
  );

  const onEditModeHandler = (id: number, editState: boolean): void => {
    setProjectData((currProjects): ProjectList => {
      return currProjects.map((project) => {
        if (project.id === id) {
          project.editMode = editState;
        } else if (editState === true) {
          // Flip others to false
          project.editMode = false;
        }

        return project;
      });
    });
  };

  const onDeleteHandler = (id: number): void => {
    setProjectData((currProjects): ProjectList => {
      return currProjects.filter((project) => project.id !== id);
    });
  };

  const onEditSaveHandler = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ): void => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("project-title-edit"));
    const details = String(input.get("project-details-edit"));

    setProjectData((currProjects): ProjectList => {
      return currProjects.map((project) => {
        if (project.id === id) {
          project.title = title;
          project.details = details;
          project.editMode = false;
        }
        return project;
      });
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("project-title-input"));
    const details = String(input.get("project-details-input"));
    e.currentTarget.reset();

    setProjectData((currProjects): ProjectList => {
      const newId: number =
        currProjects.length > 0
          ? currProjects[currProjects.length - 1].id + 1
          : 0;

      return [
        ...currProjects,
        {
          id: newId,
          editMode: false,
          title: title,
          details: details,
          tasks: [],
        },
      ];
    });
  };

  const projectList = projectData.map((project) => {
    if (project.editMode) {
      return (
        <Paper
          component="form"
          onSubmit={(e) => onEditSaveHandler(e, project.id)}
          key={project.id}
          variant="outlined"
          sx={{
            paddingLeft: 1,
            paddingRight: 1,
            paddingTop: 1,
            paddingBottom: 1,
            marginBottom: 1,
          }}
        >
          <TextField
            sx={{ marginBottom: 1 }}
            required
            fullWidth
            hiddenLabel
            defaultValue={project.title}
            variant="outlined"
            autoComplete="off"
            name="project-title-edit"
            id="project-title-edit"
          />
          <TextField
            fullWidth
            hiddenLabel
            defaultValue={project.details}
            variant="outlined"
            name="project-details-edit"
            id="project-details-edit"
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
            <Button color="error" onClick={() => onDeleteHandler(project.id)}>
              Delete
            </Button>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                onClick={() => onEditModeHandler(project.id, false)}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Stack>
          </Stack>
        </Paper>
      );
    } else {
      return (
        <Paper
          key={project.id}
          variant="outlined"
          sx={{
            paddingLeft: 2,
            paddingRight: 1,
            paddingTop: 1,
            paddingBottom: 1,
            marginBottom: 1,
          }}
        >
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" sx={{ flex: 1 }} gutterBottom>
              {project.title}
            </Typography>
            <div>
              <Button
                sx={{ maxWidth: 45, minWidth: 0 }}
                onClick={() => onEditModeHandler(project.id, true)}
              >
                <MoreHorizIcon />
              </Button>
            </div>
          </Stack>
          <Typography>{project.details}</Typography>
        </Paper>
      );
    }
  });

  return (
    <Box mt={1} mb={2}>
      <Card className="swiper-no-swiping">
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {projectList}
          {!openInput && (
            <Button variant="outlined" onClick={() => setOpenInput(true)}>
              Add Project
            </Button>
          )}
          {openInput && (
            <Grow in={openInput}>
              <form onSubmit={onSubmitHandler}>
                <TextField
                  sx={{ marginBottom: 1 }}
                  required
                  hiddenLabel
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  name="project-title-input"
                  id="project-title-input"
                  placeholder="What are you working on?"
                />
                <TextField
                  fullWidth
                  hiddenLabel
                  variant="outlined"
                  name="project-details-input"
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
                    <Button variant="contained" type="submit">
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Grow>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
