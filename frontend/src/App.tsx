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

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<LoadingSuspense />}>
      <Navbar />
      <HeroSection />
      <Divider />
      <FeatureSection />
      <Divider />
      <UploadFeature />
      <Divider />
      <PromptingFeat />
      <Footer />
    </Suspense>
  );
}

export default App;

// function Testing() {
//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: [""],
//     queryFn: async () => {
//       const response = await axios.get("/api/test");
//       return await response.data;
//     },
//   });

//   if (isPending) return "Loading...";

//   if (error) return "An error has occurred: " + error.message;

//   return (
//     <div>
//       <h2>Testing something here</h2>
//       <p>{data.test}</p>
//     </div>
//   );
// }
{
  /* <div className="card">
<p>Hit the button to see the changes in backend TESTING POST</p>
<button onClick={handleClicked}>count is {count}</button>
</div> */
}
// function Testing() {
//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ['testData'],
//     queryFn: async () => {
//       const response = await axios.get(API_CONFIG.TEST);
//       return response.data;
//     },
//     retry: 2, // Add retry logic
//     refetchOnWindowFocus: false,
//   });

//   if (isPending) return <div className="status">Loading...</div>;
//   if (error) return (
//     <div className="error">
//       Error: {(error as any).message || "Failed to fetch data"}
//     </div>
//   );

//   return (
//     <div>
//       <h2>Backend Connection Test</h2>
//       <p>GET Response: {data?.test || "No data received"}</p>
//       {isFetching && <small>Updating...</small>}
//     </div>
//   );
// }

// // Enhanced files function with error handling
// function getFiles() {
//   return axios.get(API_CONFIG.FILES)
//     .then(response => response.data)
//     .catch(error => {
//       console.error("Error fetching files:", error);
//       throw error;
//     });
// }
