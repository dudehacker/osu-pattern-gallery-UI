import React from "react";
import { Grid, Card } from "@mui/material";
import { Pattern } from "./Pattern";

const Gallery = () => {
  return (
    <Card className="bg-black f-full w-full flex-1 flex pt-4">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Pattern />
        </Grid>
      </Grid>
    </Card>
  );
};

export { Gallery };
