import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Alert, AlertTitle } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Upload } from "../components/Upload/Upload";
import CloseIcon from '@mui/icons-material/Close';

const DefaultAppBar = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleAlertOpen = (successMsg) =>{
    if (successMsg){
      setOpenAlert(true)
      setAlertMsg(successMsg)
    } 
  }

  return (
    <AppBar className="h-16" position="fixed" color="secondary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box className="grow" />
        <Upload handleUpload={handleAlertOpen}/>
        <Box className="xs:none md:flex space-x-4">
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
      {openAlert ? <Alert action={
      <IconButton aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setOpenAlert(false);
      }}>
      <CloseIcon fontSize="inherit" />
      </IconButton>
    }>
      <AlertTitle>Success</AlertTitle>
      {alertMsg}
    </Alert> : null}
    </AppBar>

  );
};

export { DefaultAppBar };
