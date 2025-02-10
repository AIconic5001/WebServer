import React from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";

AnalysisLayout.propTypes = {};

function AnalysisLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AnalysisLayout;
