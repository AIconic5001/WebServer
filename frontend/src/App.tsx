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

  const handleClicked = () => {
    setCount((count) => count + 1);
    const testPost = async () =>
      await axios.post("/api/test", { testPost: `testing ${count} POST OK` });
    testPost();
  };

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
