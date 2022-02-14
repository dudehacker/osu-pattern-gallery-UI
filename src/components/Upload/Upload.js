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
          id="pattern-title"
          label="Title"
          placeholder="Title"
          variant="outlined"
        />
        <TextField
          id="pattern-map"
          label="Map"
          placeholder="Map"
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
          label="Time Stamp"
          placeholder="Time Stamp"
          variant="outlined"
        />
        <TextField
          id="pattern-comments"
          label="Comments"
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
