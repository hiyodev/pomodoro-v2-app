import {
  Box,
  Button,
  Card,
  CardContent,
  Grow,
  Stack,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addProjectToList } from "../../redux/timerSlice";
import { RootState } from "../../redux/store";

import { Project } from "./Project";

interface Props {
  cardId: number;
}

export const ProjectList = ({ cardId }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const projects = useSelector(
    (state: RootState) => state.timer.cards[cardId].projects
  );

  const [openInput, setOpenInput] = useState<boolean>(false);

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

  const projectList = projects.map((project) => (
    <Project
      key={project.id}
      cardId={cardId}
      id={project.id}
      title={project.title}
      details={project.details}
      editMode={project.editMode}
    ></Project>
  ));

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
                  autoComplete="off"
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
