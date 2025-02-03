import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./styles.scss";
HeroSection.propTypes = {};

function HeroSection() {
  return (
    <div className="hero-container">
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant="h1" align="center">
            {" "}
            Kalliope{" "}
          </Typography>
          <Typography align="center">
            This project aims to revolutionize the academic research landscape
            by providing an smart tool for literature discovery and application
          </Typography>
        </Grid>
        <Grid size={12}>
          <div className="hero-btns-container">
            <div className="hero-btns">
              <a href="/">Upload your research paper</a>
            </div>
            <div className="hero-btns">
              <a href="/">Ask us a question?</a>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default HeroSection;
