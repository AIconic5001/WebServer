import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import UploadFeature from "./pages/Landing/UploadFeature";

const queryClient = new QueryClient();

//  API configuration
const API_CONFIG = {
  TEST: "/api/test",
  FILES: "/api/files",
  UPLOAD: "/api/upload",
};

const postTesting = async (data: string) => {
  const response = await axios.post(API_CONFIG.TEST, { test: data });
  return response;
};

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log("count changed", count);
  }, [count]);

  const handleClicked = () => {
    setCount((count) => count + 1);
    const testPost = async () =>
      await axios.post(API_CONFIG.TEST, { 
        testPost: `testing ${count} POST OK` 
      });
    testPost();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <ul className="nav">
          <li><a href="/">Home</a></li>
          <li><a href="/about">Demo 1</a></li>
          <li><a href="/about">Demo 2</a></li>
        </ul>
      </header>
      
      <h2>Testing GET</h2>
      <Testing />
      
      <div className="card">
        <p>Hit the button to see the changes in backend TESTING POST</p>
        <button onClick={handleClicked}>count is {count}</button>
      </div>

      <h3>Upload a document TEST</h3>
      <UploadFeature />
    </QueryClientProvider>
  );
}

export default App;

function Testing() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['testData'],
    queryFn: async () => {
      const response = await axios.get(API_CONFIG.TEST);
      return response.data;
    },
    retry: 2, // Add retry logic
    refetchOnWindowFocus: false,
  });

  if (isPending) return <div className="status">Loading...</div>;
  if (error) return (
    <div className="error">
      Error: {(error as any).message || "Failed to fetch data"}
    </div>
  );

  return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>GET Response: {data?.test || "No data received"}</p>
      {isFetching && <small>Updating...</small>}
    </div>
  );
}

// Enhanced files function with error handling
function getFiles() {
  return axios.get(API_CONFIG.FILES)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching files:", error);
      throw error;
    });
}