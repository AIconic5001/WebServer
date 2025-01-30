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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>Hit the button to see the changes in backend</p>
        <button onClick={handleClicked}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Testing />
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
