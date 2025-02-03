import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";

TopicBox.propTypes = {};

function TopicBox() {
  return (
    <div className="topic-box">
      <Box>
        <div className="prompt-box">
          <h3>Browse by Topic</h3>
          <p>Explore our resources by subject</p>
        </div>
        <Grid container spacing={3} flexDirection={"row"}>
          <Grid size={6}>
            <Button variant="outlined" color="secondary">
              Topic 1
            </Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" color="secondary">
              Topic 1
            </Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" color="secondary">
              Topic 1
            </Button>
          </Grid>
          <Grid size={6}>
            <Button variant="outlined" color="secondary">
              Topic 1
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default TopicBox;
