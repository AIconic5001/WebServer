import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
SearchBox.propTypes = {};

function SearchBox() {
  return (
    <div className="search-box">
      <Box>
        <Grid container>
          <Grid container size={12}>
            <Grid>
              <h3>Search Directly</h3>
              <p>Ask any question to search database</p>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<SearchIcon />}
              >
                Tell us what you are researching
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SearchBox;
