import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileTypes } from "../../../@types/FileTypes/file.type";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState<Array<FileTypes>>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    // Do something with the files
    console.log(acceptedFiles);
    const updatedList = [
      ...file,
      ...acceptedFiles.map((f: File) => ({
        name: f.name,
        url: URL.createObjectURL(f),
      })),
    ];
    setFile(updatedList);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // useEffect(() => {
  //   getAllFiles();
  // }, []);

  // const getAllFiles = async () => {
  //   try {
  //     const res = await axios.get("/api/files/files");
  //     setFile(res.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleSubmit = (event: any) => {
    // event.preventDefault();
    event.preventDefault();
    console.log("im here");
    const formData = new FormData(event.target);
    file.forEach((f) => {
      formData.append("file", f);
    });
    console.log("formData", formData, file);

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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            await axios.post("/api/files/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }}
        >
          <input type="file" name="file" />
          <button className="submit-btn" type="submit">
            Upload
          </button>
        </form>
      </div>

      <form onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dropzone-container">
          <input {...getInputProps()} multiple type="file" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {file.length > 0 && (
          <button className="submit-btn" type="submit">
            Submit
          </button>
        )}
      </form>

      {file.length > 0 &&
        file.map((f: FileTypes) => (
          <a key={f.name} href={f.url}>
            {f.name}
          </a>
        ))}
      <Grid className="feat-summaries-container" container spacing={3} mt={2}>
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
