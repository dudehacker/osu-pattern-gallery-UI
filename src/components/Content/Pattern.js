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

const formatLink = (text) => {
  return "osu://edit/" + text;
}

const formatCardTitle = (beatmap) => {
  return `${beatmap.artist} - ${beatmap.title} [${beatmap.version}] mapped by ${beatmap.creator}`
}

const formatUserProfile = (osuId) => {
  return `https://osu.ppy.sh/users/${osuId}`
}

const getBeatmapUrl = (beatmap) => {
    return `https://osu.ppy.sh/beatmapsets/${beatmap.beatmapSetId}#mania/${beatmap.id}`
}



const Pattern = (props) => {
  const [open, setOpen] = useState(false);
  const [mapLink, setMapLink] = useState(getBeatmapUrl(props.data.beatmap));
  const [uploadByUrl, setUploadByUrl] = useState(formatUserProfile(props.data.p_uploadBy.id));

  const handleDialog = () => {
    setOpen(!open);
  };

  const openMapLink = (e) =>{
    window.open(mapLink, '_blank').focus();
  }

  return (
    <Card className="bg-black f-full w-full flex-1" onClick={handleDialog}>
      <CardMedia
        component="img"
        image={props.data.imageUrl}
        alt="pattern-id"
      />

      <Dialog open={open}>
        <Card className="bg-black f-full w-full flex-1">
          <CardHeader 
          // TODO: need open link in new tab, but this auto open all even without click
            title={<div onClick={openMapLink}>{formatCardTitle(props.data.beatmap)}</div>}
            // title={(<a href={getBeatmapUrl(props.data.beatmap)}>{formatCardTitle(props.data.beatmap)}</a>)} 
            subheader={"Submission date: " + props.data.p_uploadDate }/>
          <CardMedia
            component="img"
            image={props.data.imageUrl}
            alt="pattern-id"
          />
          <CardContent> 
          <h2>{"Description: " + props.data.description}</h2>
          <label>Timestamps:</label>
          {/* this link needs to be styled as a hyperlink, it just looks like normal text */}
          <div><a style={{color:'inherit'}}  href={formatLink(props.data.osuTimestamps)}>{props.data.osuTimestamps}</a></div>
          <div><a style={{color:'inherit'}}  href={uploadByUrl}>{"Upload by: " + props.data.p_uploadBy.username}</a></div>
          </CardContent>
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
