import React, { useState } from "react";
import { useFormControls } from "./formControls";
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  AlertTitle,
  Alert,
  IconButton
  //   Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const inputFieldValues = [
  {
    name: "beatmapUrl",
    label: "Map Link",
    id: "beatmapUrl"
  },
  {
    name: "imageUrl",
    label: "Image Link",
    id: "imageUrl"
  },
  {
    name: "osuTimestamps",
    label: "Timestamps",
    id: "osuTimestamps"
  },
  {
    name: "description",
    label: "Description",
    id: "description",
    multiline: true,
    maxRows: 20
  }
];

const Upload = (props) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAlertOpen = (errMsg) =>{
    if (errMsg){
      setOpenAlert(true)
      setAlertMsg(errMsg)
    } else {
      console.log("upload success")
      setOpenAlert(false)
      setAlertMsg(null)
      setOpen(false)
      props.handleUpload("You have succcessfuly uploaded the pattern!")
    }
  }

  const {
    handleInputValue,
    handleFormSubmit,
    formIsValid,
    errors
  } = useFormControls(handleAlertOpen);

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
        {openAlert ? <Alert severity="error" action={
          <IconButton aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpenAlert(false);
          }}>
          <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          <AlertTitle>Error</AlertTitle>
          {alertMsg}
        </Alert> : null}
        <form autoComplete="off" onSubmit={handleFormSubmit} >
        {inputFieldValues.map((inputFieldValue, index) => {
        return (
          <TextField
            key={index}
            onChange={handleInputValue}
            onBlur={handleInputValue}
            name={inputFieldValue.name}
            label={inputFieldValue.label}
            helperText={errors[inputFieldValue.name]}
            multiline={inputFieldValue.multiline ?? false}
            fullWidth
            // rows={inputFieldValue.rows ?? 1}
            autoComplete="none"
            {...(errors[inputFieldValue.name] && {
              error: true,
              helperText: errors[inputFieldValue.name]
            })}
          />
        );
      })}

        <DialogActions disableSpacing className="flex justify-between">
          <Button variant="contained" type="submit" disabled={!formIsValid()}>Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export { Upload };
