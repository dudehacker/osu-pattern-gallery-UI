import React, { useState } from "react";
import routes from "../../service/api";
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";

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

function SimpleDialog(props){
  const {onClose, open} = props;
  console.log(open)
  const [mapLink, setMapLink] = useState(getBeatmapUrl(props.data.beatmap));
  const [uploadByUrl, setUploadByUrl] = useState(formatUserProfile(props.data.p_uploadBy.id));
  const [liked, setLiked] = useState(props.data.liked);
  const [disliked, setDisliked] = useState(props.data.disliked);


  const handleClose = () => {
    onClose();
  };

  const openMapLink = (e) =>{
    window.open(mapLink, '_blank').focus();
  };

  
  const changeLike = () =>{
    axios.post(routes.pattern+`/${props.data._id}/like`).then(
      res => {
        setLiked(!liked);
        if (disliked){
          setDisliked(false);
        }
      }
    );
  };

  const changeDislike = () =>{
    axios.post(routes.pattern+`/${props.data._id}/dislike`).then(
      res => {
        setDisliked(!disliked);
        if (liked){
          setLiked(false);
        }
      }
    );
  };

  let likedClass = liked ? "likedButton" : "normalButton";
  let dislikedClass = disliked ? "dislikedButton" : "normalButton";


  return (
  <Dialog open={open} onClose={handleClose}>
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
            <IconButton aria-label="like pattern" onClick={changeLike}>
              <ThumbUpIcon className={likedClass}/>
            </IconButton>
            <IconButton aria-label="dislike pattern" onClick={changeDislike}>
              <ThumbDownIcon className={dislikedClass}/>
            </IconButton>
          </CardActions>
        </Card>
        <DialogActions disableSpacing className="flex justify-between">
          <Button onClick={handleClose}>X</Button>
        </DialogActions>
      </Dialog>
  )
}

const Pattern = (props) => {
  const [open, setOpen] = useState(false);
  console.log(open)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("should close")
    setOpen(false);
  };

  return (
    <Card className="bg-black f-full w-full flex-1" onClick={handleClickOpen}>
      <CardMedia
        component="img"
        image={props.data.imageUrl}
        alt="pattern-id"
      />

      <SimpleDialog
        data={props.data}
        open={open}
        onClose={handleClose}
      />
    </Card>
  );
};

export { Pattern };
