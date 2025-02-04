import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
FeatureSection.propTypes = {};

function FeatureSection() {
  return (
    <div className="feature-container">
      <Grid container spacing={3}>
        <Grid size={6}>
          <div className="feature-box">
            <h3>Research Paper Summary</h3>
            <p>
              Provides a comprehensive research paper summary covering the
              synopsis, research methods, results, and limitations from any
              uploaded paper.
            </p>
          </div>
        </Grid>
        <Grid size={6}>
          <div className="feature-box">
            <h3>Reverse Recommendation</h3>
            <p>
              Recommends users with most 5 related papers related to the
              prompted keywords.
            </p>
          </div>
        </Grid>
        <Grid size={6}>
          <div className="feature-box">
            <h3>Save Related Papers</h3>
            <p>
              Enables users to save and share collection of related research
              papers
            </p>
          </div>
        </Grid>
        <Grid size={6}>
          <div className="feature-box">
            <h3>Citation Timeline & Relevance Tracker</h3>
            <p>
              Analyze the relevance of the citations in any uploaded academic
              research and visualize citation patterns over time.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default FeatureSection;
