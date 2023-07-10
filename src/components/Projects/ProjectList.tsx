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

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProjectToList } from "../../redux/timerSlice";
import { RootState } from "../../redux/store";

interface Props {
  cardId: number;
}

export const ProjectList = ({ cardId }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.timer.cards[cardId].projects
  );

  console.log(projects);

  const [openInput, setOpenInput] = useState<boolean>(false);

  const onEditModeHandler = (id: number, editState: boolean): void => {
    // setProjectData((currProjects): ProjectList => {
    //   return currProjects.map((project) => {
    //     if (project.id === id) {
    //       project.editMode = editState;
    //     } else if (editState === true) {
    //       // Flip others to false
    //       project.editMode = false;
    //     }
    //     return project;
    //   });
    // });
  };

  const onDeleteHandler = (id: number): void => {
    // setProjectData((currProjects): ProjectList => {
    //   return currProjects.filter((project) => project.id !== id);
    // });
  };

  const onEditSaveHandler = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ): void => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("project-title-edit"));
    const details = String(input.get("project-details-edit"));

    // setProjectData((currProjects): ProjectList => {
    //   return currProjects.map((project) => {
    //     if (project.id === id) {
    //       project.title = title;
    //       project.details = details;
    //       project.editMode = false;
    //     }
    //     return project;
    //   });
    // });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("project-title-input"));
    const details = String(input.get("project-details-input"));
    e.currentTarget.reset();

    dispatch(
      addProjectToList({
        id: cardId,
        project: {
          id: uuidv4(),
          editMode: false,
          title: title,
          details: details,
        },
      })
    );
  };

  const projectList = projects.map((project) => {
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
