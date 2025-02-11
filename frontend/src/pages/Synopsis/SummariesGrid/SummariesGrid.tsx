import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import { SummariesDataType } from "../../../@types/SynopsisData/grid.type";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

SummariesGrid.propTypes = {};

function SummariesGrid({ data }: { data: SummariesDataType }) {
  const keys = Object.keys(data) as Array<keyof typeof data>;
  return (
    <div>
      <Grid spacing={0} container>
        {keys.map((key) => (
          <Grid size={4} height={"40px"}>
            <Typography variant="h6" align="center">
              {key}
            </Typography>
          </Grid>
        ))}
        <Grid container spacing={4}>
          {" "}
          {keys.map((key) => (
            <Grid container key={key} size={4}>
              <Grid size={12} pt={2} borderTop={1}>
                <Typography variant="body1" align="justify">
                  {data[key]}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default SummariesGrid;
