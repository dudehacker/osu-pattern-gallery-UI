import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  Link,
} from "@mui/material";

import { ThumbUpIcon, ThumbDownIcon } from "../Icons";

import {
  formatLink,
  formatCardTitle,
  formatUserProfile,
  formatDate,
  calculatePassRates, 
  calculateLNRates,
  formatTimestamps
} from "./patternHelper";

import { changeLike, changeDislike, getPattern } from "../../service/patternService";

const PatternDialog = (props) => {
  const { onClose, open } = props;
  const [pattern, setPattern] = useState(null);

  async function fetchData() {
    getPattern(props.data._id).then((res) => {
      setPattern(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const openMapLink = (e) => {
    window.open(pattern.beatmapUrl, "_blank").focus();
  };

  const handleLike = () => {
    changeLike(pattern._id).then(() => {
      fetchData()
    });
  };

  const handleDislike = () => {
    changeDislike(pattern._id).then(() => {
      fetchData()
    });
  };

  if (!pattern) return null

  const classes = {
    likedClass: pattern.liked ? "likedButton" : "normalButton",
    dislikedClass: pattern.disliked ? "dislikedButton" : "normalButton",
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card className="bg-black f-full w-full flex-1">
        <CardHeader
          // need make it look like its clickeable
          title={
            <div onClick={openMapLink}>
              {formatCardTitle(pattern.beatmap)}
            </div>
          }
          subheader={
          <div>
            <p>{"Map ranked: " + formatDate(pattern.beatmap.raw_approvedDate)}</p>
            <p>{"Pattern uploaded: " + formatDate(pattern.p_uploadDate)}</p>
            <p>{"Liked: " + pattern.likedBy.length}</p>
            <p>{"Disliked: " + pattern.dislikedBy.length}</p>
            <p>{"Genre: " + pattern.beatmap.genre}</p>
            <p>{"Language: " + pattern.beatmap.language}</p>
            <p>{"BPM: " + pattern.beatmap.bpm}</p>
            <p>{"Favorites: "+ pattern.beatmap.counts.favorites}</p>
            <p>{"Success Rate: "+ calculatePassRates(pattern)}</p>
            <p>{"LN ratio: "+calculateLNRates(pattern)}</p>
          </div>}
        />
        <CardMedia
          component="img"
          image={pattern.imageUrl}
          alt="pattern-id"
        />
        <CardContent>
          <h2>{"Description: " + pattern.description}</h2>
          <label>Timestamps:</label>
          {/* this link needs to be styled as a hyperlink, it just looks like normal text */}
          <div>
            <Link
              href={formatLink(pattern.osuTimestamps)}
            >
              {formatTimestamps(pattern.osuTimestamps)}
            </Link>
          </div>
          <div>
            <label>Upload by: </label>
            <Link href={formatUserProfile(pattern.p_uploadBy.id)}>
              {pattern.p_uploadBy.username}
            </Link>
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
    </Dialog>
  );
};

export { PatternDialog };
