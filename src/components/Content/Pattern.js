import React, { useState } from "react";
import { Card, CardMedia } from "@mui/material";
import { PatternDialog } from "./PatternDialog";

const Pattern = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className="bg-black f-full w-full flex-1">
      <CardMedia
        component="img"
        image={props.data.imageUrl}
        alt="pattern-id"
        onClick={handleClickOpen}
      />
      <PatternDialog data={props.data} open={open} onClose={handleClose} />
    </Card>
  );
};

export { Pattern };
