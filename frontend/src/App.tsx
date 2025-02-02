import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

const postTesting = async (data: string) => {
  const response = await axios.post("/api/test", { test: data });
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
      await axios.post("/api/test", { testPost: `testing ${count} POST OK` });
    testPost();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <h1> Testing </h1>
      <h2> Testing GET </h2>
      <Testing />
      <div className="card">
        <p>Hit the button to see the changes in backend TESTING POST</p>
        <button onClick={handleClicked}>count is {count}</button>
      </div>

      <h3>Upload a document TEST</h3>
      <Upload />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </QueryClientProvider>
  );
}

export default App;

function Testing() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const response = await axios.get("/api/test");
      return await response.data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h2>Testing something here</h2>
      <p>{data.test}</p>
    </div>
  );
}

function Upload() {
  const queryClient = useQueryClient();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("file"));
    const testUpload = async () =>
      await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    testUpload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  );
}

function getFiles() {
  return axios.get("/api/files");
}
