import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { Typography } from "@mui/material";

Navbar.propTypes = {};

function Navbar() {
  return (
    <header>
      <ul className="nav">
        <li>
          <Typography variant="h6" sx={{ color: "var(--primary) " }}>
            <a href="/">Home</a>
          </Typography>
        </li>
        <li>
          <Typography variant="h6" sx={{ color: "var(--primary) " }}>
            <a href="/synopsis">Synopsis</a>
          </Typography>
        </li>
        <li>
          <Typography variant="h6" sx={{ color: "var(--primary) " }}>
            <a href="/about">About Us</a>
          </Typography>
        </li>
        <li>
          <Typography variant="h6" sx={{ color: "var(--primary) " }}>
            <a href="/citations">Citations</a>
          </Typography>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
