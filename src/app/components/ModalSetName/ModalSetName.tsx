import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onSetValue: (name: string) => void;
};
export const ModalSetName = ({ open, onClose, onSetValue }: ModalProps) => {
  const [value, setValue] = useState("");
  const handleClose = () => {
    onClose();
  };
  const handleSetName = () => {
    if (value?.length) {
      onSetValue(value);
      setValue("");
      onClose();
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>New User</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your name</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="userName"
          label="User name"
          type="text"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={!value?.length} onClick={handleSetName}>
          Send
        </Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
