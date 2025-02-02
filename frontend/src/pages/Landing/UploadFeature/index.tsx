import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileTypes } from "../../../@types/FileTypes/file.type";
import "./styles.scss";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    getAllFiles();
  }, []);

  const getAllFiles = async () => {
    try {
      const res = await axios.get("/api/files/files");
      setFile(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (event: any) => {
    // event.preventDefault();
    const formData = new FormData(event.target);
    const testUpload = async () =>
      await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    try {
      testUpload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {file.length > 0 ? (
        file.map((f: FileTypes) => <a href={f.url}>{f.name}</a>)
      ) : (
        <a>No files Uploaded Yet</a>
      )}
      <div style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadFeature;
