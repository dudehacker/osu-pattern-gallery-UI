import React, { Fragment, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Alert,
  AlertTitle,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Upload } from "../components/Upload/Upload";
import CloseIcon from "@mui/icons-material/Close";
import routes from "../api";
import Cookies from "js-cookie";

const DefaultAppBar = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [username, setUserName] = useState(Cookies.get("username"));
  const [avatar, setAvatar] = useState(Cookies.get("avatar"));

  const handleAlertOpen = (successMsg) => {
    if (successMsg) {
      setOpenAlert(true);
      setAlertMsg(successMsg);
    }
  };
  
  const logout = () => {
    Cookies.remove("username");
    Cookies.remove("avatar");
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
        <Upload handleUpload={handleAlertOpen} />
        {username ? (
          <Fragment>
            <img src={avatar} alt="avatar" style={{height:"40px"}}/>
            <a href={routes.logout} onClick={logout}>Logout</a>
          </Fragment>
        ) : <a href={routes.login}>Login</a>}
        <Box className="xs:none md:flex space-x-4">
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            color="inherit"
          ></IconButton>
        </Box>
      </Toolbar>
      {openAlert ? (
        <Alert
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
          <AlertTitle>Success</AlertTitle>
          {alertMsg}
        </Alert>
      ) : null}
    </AppBar>
  );
};

export { DefaultAppBar };
