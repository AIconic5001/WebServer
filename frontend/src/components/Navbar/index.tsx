import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

Navbar.propTypes = {};

function Navbar() {
  return (
    <header>
      <ul className="nav">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/citations">Citations</a>
        </li>
      </ul>
    </header>
  );
}

export default Navbar;
