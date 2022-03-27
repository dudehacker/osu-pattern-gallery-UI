import React, { useState, useEffect } from "react";
import { Grid, Card } from "@mui/material";
import { Pattern } from "./Pattern";
import axios from "axios";
import routes from "../../service/api";

const Gallery = () => {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    async function fetchData() {
      axios.get(routes.pattern).then((res) => {
        console.log(res);
        setPatterns(res.data);
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
