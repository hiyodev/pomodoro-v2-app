import { Paper, Stack, Typography, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { setProjectEditMode } from "../../redux/timerSlice";

interface Props {
  cardId: number;
  id: string;
  title: string;
  details: string;
}

export const Project = ({ cardId, id, title, details }: Props) => {
  const dispatch = useDispatch();

  const onEditModeHandler = (projectId: string, editState: boolean): void => {
    dispatch(setProjectEditMode({ cardId, projectId, editState }));
  };

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
};
