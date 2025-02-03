import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Button } from "@mui/material";
import TopicBox from "./TopicBox";
import SearchBox from "./SearchBox";

PromptingFeat.propTypes = {};

function PromptingFeat() {
  return (
    <div className="prompt-container">
      <Grid container spacing={3} flexDirection={"row"}>
        <Grid size={6}>
          <SearchBox />
        </Grid>
        <Grid size={6}>
          <TopicBox />
        </Grid>
      </Grid>
    </div>
  );
}

export default PromptingFeat;
