import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileTypes } from "../../../@types/FileTypes/file.type";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="upload-container">
      <h3>Upload your research paper</h3>

      <div style={{ marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" />
          <button type="submit">Upload</button>
        </form>
      </div>

      {file.length > 0 ? (
        file.map((f: FileTypes) => <a href={f.url}>{f.name}</a>)
      ) : (
        <p>No files Uploaded Yet</p>
      )}
      <Grid container spacing={3} mt={2}>
        <Grid size={6}>
          <Typography>
            Provide insights into research paper: synopsis, research method,
            findings, limitations
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography>
            Recommend next-to-read paper based on your paper and related fields
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography>Save and share insights of your paper</Typography>
        </Grid>
        <Grid size={6}>
          <Typography>
            Visualize the timeline and the relevance of the citations
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default UploadFeature;
