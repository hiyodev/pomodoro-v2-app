import { Paper, Stack, Typography, Button, TextField } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import {
  delProjectFromList,
  updateProjectList,
  setProjectEditMode,
} from "../../redux/timerSlice";

interface Props {
  cardId: number;
  id: string;
  title: string;
  details: string;
  editMode: boolean;
}

export const Project = ({ cardId, id, title, details, editMode }: Props) => {
  const dispatch = useDispatch();

  const onEditModeHandler = (projectId: string, editState: boolean): void => {
    dispatch(setProjectEditMode({ cardId, projectId, editState }));
  };

  const onDeleteHandler = (projectId: string): void => {
    dispatch(delProjectFromList({ cardId, projectId }));
  };

  const onEditSaveHandler = (
    e: React.FormEvent<HTMLFormElement>,
    projectId: string
  ): void => {
    e.preventDefault();

    const input = new FormData(e.currentTarget);
    const title = String(input.get("project-title-edit"));
    const details = String(input.get("project-details-edit"));

    dispatch(
      updateProjectList({
        cardId,
        projectId,
        project: {
          title,
          details,
        },
      })
    );
  };

  if (editMode) {
    return (
      <Paper
        component="form"
        onSubmit={(e) => onEditSaveHandler(e, id)}
        key={id}
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
          defaultValue={title}
          variant="outlined"
          autoComplete="off"
          name="project-title-edit"
          id="project-title-edit"
        />
        <TextField
          fullWidth
          hiddenLabel
          defaultValue={details}
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
          <Button color="error" onClick={() => onDeleteHandler(id)}>
            Delete
          </Button>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => onEditModeHandler(id, false)}
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
        key={id}
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
            {title}
          </Typography>
          <div>
            <Button
              sx={{ maxWidth: 45, minWidth: 0 }}
              onClick={() => onEditModeHandler(id, true)}
            >
              <MoreHorizIcon />
            </Button>
          </div>
        </Stack>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{details}</Typography>
      </Paper>
    );
  }
};
