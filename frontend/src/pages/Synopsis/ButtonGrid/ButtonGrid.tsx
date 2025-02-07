import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
ButtonGrid.propTypes = {};

function ButtonGrid() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Button variant="outlined">Summaries</Button>
        </Grid>
        <Grid size={6}>
          <Button variant="outlined" color="primary">
            Recommendations
          </Button>
        </Grid>
        <Grid size={6}>
          <Button variant="outlined" color="secondary">
            Citation Timeline & Relevance Tracker
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ButtonGrid;
