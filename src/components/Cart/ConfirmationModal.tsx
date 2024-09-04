import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

interface ConfirmationModalProps {
  isOpen: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  handleCancel,
  handleConfirm,
}: ConfirmationModalProps) => {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={isOpen}
      onClose={handleCancel}
    >
      <DialogTitle>Confirm your action</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>Are you sure you want to clear the cart?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" color="error" onClick={handleCancel}>
          No, forget it.
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleConfirm}>
          Yes, absolutely!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
