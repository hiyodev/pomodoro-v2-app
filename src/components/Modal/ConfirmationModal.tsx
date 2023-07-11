import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface Props {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmHandler: () => void;
}

export const ConfirmationModal = ({
  modalState,
  setModalState,
  onConfirmHandler,
}: Props) => {
  return (
    <Dialog
      open={modalState}
      onClose={() => setModalState(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete this card?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure? All projects and tasks under this card will be deleted!
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}
      >
        <Button onClick={() => setModalState(false)}>Cancel</Button>
        <Button autoFocus onClick={onConfirmHandler}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
