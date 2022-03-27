import React, { useState, useEffect } from "react";
import { Grid, Card } from "@mui/material";
import { Pattern } from "./Pattern";
import { getPatterns } from "../../service/patternService";

const Gallery = () => {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      getPatterns().then((res) => {
        setPatterns(res);
      });
    }
    fetchData();
  }, []);

  return (
    <Card className="bg-black f-full w-full flex-1 flex pt-4">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          {patterns.map((pattern) => (
            <Pattern key={pattern._id} data={pattern} />
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};

export { Gallery };
