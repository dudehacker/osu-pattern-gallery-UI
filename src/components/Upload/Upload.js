import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  //   Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Upload = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        endIcon={<AddIcon />}
      >
        Upload
      </Button>
      <Dialog onClose={handleClickOpen} open={open}>
        <DialogTitle>Submit New Pattern</DialogTitle>
        <TextField
          id="pattern-difficulty"
          label="Difficulty"
          placeholder="Difficulty"
          variant="outlined"
        />
        <TextField
          id="pattern-map"
          label="Map Link"
          placeholder="Map Link"
          variant="outlined"
        />
        <TextField
          id="pattern-url"
          label="Image Url"
          placeholder="Image Url"
          variant="outlined"
        />
        <TextField
          id="pattern-timestamp"
          label="Timestamp"
          placeholder="Timestamp"
          variant="outlined"
        />
        <TextField
          id="pattern-description"
          label="Description"
          variant="outlined"
          multiline
          maxRows={Infinity}
        />
        <DialogActions disableSpacing className="flex justify-between">
          <Button onClick={handleClose}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export { Upload };
