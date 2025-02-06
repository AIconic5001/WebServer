import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
FeatSummaries.propTypes = {};

function FeatSummaries() {
  return (
    <Grid className="feat-summaries-container" container spacing={3} mt={2}>
      <Grid size={6}>
        <Typography>
          Provide insights into research paper: synopsis, research method,
          findings, limitations
        </Typography>
      </Grid>
      <Grid size={6}>
        <Typography>
          Recommend next-to-read paper based on your paper and related fields
        </Typography>
      </Grid>
      <Grid size={6}>
        <Typography>Save and share insights of your paper</Typography>
      </Grid>
      <Grid size={6}>
        <Typography>
          Visualize the timeline and the relevance of the citations
        </Typography>
      </Grid>
    </Grid>
  );
}

export default FeatSummaries;
