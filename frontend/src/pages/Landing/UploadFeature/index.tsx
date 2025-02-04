import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileTypes } from "../../../@types/FileTypes/file.type";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { ALLOWED_TYPES, API_CONFIG } from "../../../constants/api.constant";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState<Array<FileTypes>>([]);
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Improved file validation
  const validateFile = (file: File): boolean => {
    if (!file) return false;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_TYPES.includes(extension)) {
      setFileError(
        `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`
      );
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setFileError("File size exceeds 10MB limit");
      return false;
    }

    setFileError(null);
    return true;
  };

  // Enhanced upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(API_CONFIG.UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [API_CONFIG.FILES] });
      setSelectedFile(null);
    },
    onError: (error: any) => {
      console.error(
        "Upload error:",
        error.response?.data?.error || error.message
      );
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && validateFile(selectedFile)) {
      uploadMutation.mutate(selectedFile);
    }
  };

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

  // const handleSubmit = (event: any) => {
  //   // event.preventDefault();
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   // file.forEach((f) => {
  //   //   formData.append("file", f);
  //   // });
  //   // console.log("formData", formData, file);

  //   const testUpload = async () =>
  //     await axios.post("/api/files/upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //   try {
  //     testUpload();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <div className="upload-container">
      <h3>Upload your research paper</h3>

      <form>
        <div {...getRootProps()} className="dropzone-container">
          <input
            {...getInputProps()}
            onChange={handleFileSelect}
            accept={ALLOWED_TYPES.map((t) => `.${t}`).join(",")}
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="upload-button"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {fileError && <p className="error-message">{fileError}</p>}

      {/* Upload status */}
      {uploadMutation.isError && (
        <p className="error-message">
          Error:{" "}
          {uploadMutation.error?.response?.data?.error || "Upload failed"}
        </p>
      )}

      {uploadMutation.isSuccess && (
        <p className="success-message">
          File {uploadMutation.data.filename} uploaded successfully!
        </p>
      )}

      {/* File preview */}
      {selectedFile && (
        <div className="file-preview">
          <p>Selected File: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

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
