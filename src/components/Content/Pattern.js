import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  Button,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const Pattern = () => {
  const [open, setOpen] = useState(false);

  const handleDialog = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <Card className="bg-black f-full w-full flex-1" onClick={handleDialog}>
      <CardMedia
        component="img"
        image="https://i.imgur.com/17Kjrwb.jpg"
        alt="pattern-id"
      />

      <Dialog open={open}>
        <Card className="bg-black f-full w-full flex-1">
          <CardHeader title="Pattern Title" subheader="submission date" />
          <CardMedia
            component="img"
            image="https://i.imgur.com/17Kjrwb.jpg"
            alt="pattern-id"
          />
          <CardContent> Pattern Description </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="favorite pattern">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="like pattern">
              <ThumbUpIcon />
            </IconButton>
            <IconButton aria-label="dislike pattern">
              <ThumbDownIcon />
            </IconButton>
          </CardActions>
        </Card>
        <DialogActions disableSpacing className="flex justify-between">
          <Button onClick={handleDialog}>X</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export { Pattern };
