import React, { useState } from "react";
import { useFormControls } from "./formControls";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  AlertTitle,
  Alert,
  IconButton,
  Fab,
  //   Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const inputFieldValues = [
  {
    name: "beatmapUrl",
    label: "Map Link",
    id: "beatmapUrl",
  },
  {
    name: "imageUrl",
    label: "Image Link",
    id: "imageUrl",
  },
  {
    name: "osuTimestamps",
    label: "Timestamps",
    id: "osuTimestamps",
  },
  {
    name: "description",
    label: "Description",
    id: "description",
    multiline: true,
    maxRows: 20,
  },
];

const Upload = (props) => {
  const [open, setOpen] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [error, openError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () =>
    Cookies.get("username") ? setOpen(!open) : setNotLoggedIn(!notLoggedIn);

  const handleAlertOpen = (errMsg) => {
    if (errMsg) {
      setOpenAlert(true);
      setAlertMsg(errMsg);
    } else {
      console.log("upload success");
      setOpenAlert(false);
      setAlertMsg(null);
      setOpen(false);
      props.handleUpload("You have succcessfuly uploaded the pattern!");
    }
  };

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls(handleAlertOpen);

  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  return (
    <div>
      <Fab
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={style}
        aria-label="upload"
      >
        <AddIcon />
      </Fab>
      <Dialog onClose={handleClickOpen} open={open}>
        <DialogTitle>Submit New Pattern</DialogTitle>
        {openAlert ? (
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {alertMsg}
          </Alert>
        ) : null}
        <form autoComplete="off" onSubmit={handleFormSubmit}>
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
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}

          <DialogActions disableSpacing className="flex justify-between">
            <Button variant="contained" type="submit" disabled={!formIsValid()}>
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog onClose={handleClickOpen} open={notLoggedIn}>
        <Alert severity="error">
          You must be logged in to upload a pattern!
        </Alert>
      </Dialog>
    </div>
  );
};

export { Upload };
