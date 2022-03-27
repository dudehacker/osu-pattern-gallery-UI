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

import { ThumbUpIcon, ThumbDownIcon } from "../Icons";

import {
  formatLink,
  formatCardTitle,
  formatUserProfile,
  getBeatmapUrl,
} from "./patternHelper";

import { changeLike, changeDislike } from "../../service/patternService";

const PatternDialog = (props) => {
  const { onClose, open } = props;
  const [liked, setLiked] = useState(props.data.liked);
  const [disliked, setDisliked] = useState(props.data.disliked);
  const [mapLink, setMapLink] = useState(getBeatmapUrl(props.data.beatmap));
  const [uploadByUrl, setUploadByUrl] = useState(
    formatUserProfile(props.data.p_uploadBy.id)
  );

  const handleClose = () => {
    onClose();
  };

  const openMapLink = (e) => {
    window.open(mapLink, "_blank").focus();
  };

  const handleLike = () => {
    changeLike(props.data._id).then(() => {
      setLiked(!liked);
      if (disliked) {
        setDisliked(false);
      }
    });
  };

  const handleDislike = () => {
    changeDislike(props.data._id).then(() => {
      setDisliked(!disliked);
      if (liked) {
        setLiked(false);
      }
    });
  };

  const classes = {
    likedClass: liked ? "likedButton" : "normalButton",
    dislikedClass: disliked ? "dislikedButton" : "normalButton",
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card className="bg-black f-full w-full flex-1">
        <CardHeader
          // TODO: need open link in new tab, but this auto open all even without click
          title={
            <div onClick={openMapLink}>
              {formatCardTitle(props.data.beatmap)}
            </div>
          }
          // title={(<a href={getBeatmapUrl(props.data.beatmap)}>{formatCardTitle(props.data.beatmap)}</a>)}
          subheader={"Submission date: " + props.data.p_uploadDate}
        />
        <CardMedia
          component="img"
          image={props.data.imageUrl}
          alt="pattern-id"
        />
        <CardContent>
          <h2>{"Description: " + props.data.description}</h2>
          <label>Timestamps:</label>
          {/* this link needs to be styled as a hyperlink, it just looks like normal text */}
          <div>
            <a
              style={{ color: "inherit" }}
              href={formatLink(props.data.osuTimestamps)}
            >
              {props.data.osuTimestamps}
            </a>
          </div>
          <div>
            <a style={{ color: "inherit" }} href={uploadByUrl}>
              {"Upload by: " + props.data.p_uploadBy.username}
            </a>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="like pattern" onClick={handleLike}>
            <ThumbUpIcon className={classes.likedClass} />
          </IconButton>
          <IconButton aria-label="dislike pattern" onClick={handleDislike}>
            <ThumbDownIcon className={classes.dislikedClass} />
          </IconButton>
        </CardActions>
      </Card>
      <DialogActions disableSpacing className="flex justify-between">
        <Button onClick={onClose}>X</Button>
      </DialogActions>
    </Dialog>
  );
};

export { PatternDialog };
