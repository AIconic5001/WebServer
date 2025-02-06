import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import "./App.scss";
import LoadingSuspense from "./components/LoadingSuspense";
import Navbar from "./components/Navbar";
import UploadFeature from "./pages/Landing/UploadFeature";
import HeroSection from "./pages/Landing/HeroSection";
import FeatureSection from "./pages/Landing/Features";
import PromptingFeat from "./pages/Landing/PromptingFeat";
import Footer from "./components/Footer";
import { Divider } from "@mui/material";
import TestingComponent from "./components/TestingPart";
import { FiveG } from "@mui/icons-material";
import { RouterProvider } from "react-router";
import { routes } from "./config/routes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<LoadingSuspense />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;

function Testing() {
  return <div> Tesing </div>;
}
