import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface Props {
  dialogState: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmationModal = ({ dialogState, setDialogState }: Props) => {
  return (
    <Dialog
      open={dialogState}
      onClose={() => setDialogState(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">"Are you sure?"</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogState(false)}>Cancel</Button>
        <Button autoFocus>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
