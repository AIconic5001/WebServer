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
import FeatSummaries from "./Components/FeatSummaries";
import { useGetAllFiles, useUploadFile } from "../handleFilesApi";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState<Array<FileTypes>>([]);
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    mutate: uploadFile,
    isSuccess: uploadSuccess,
    isPending: pendingUpload,
    isError: uploadError,
  } = useUploadFile();

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && validateFile(selectedFile)) {
      uploadFile(selectedFile);
    }
  };

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    // Do something with the files
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
          disabled={!selectedFile || pendingUpload}
          className="upload-button"
        >
          {pendingUpload ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {fileError && <p className="error-message">{fileError}</p>}

      {/* Upload status */}
      {uploadError && (
        <p className="error-message">Error: {uploadError || "Upload failed"}</p>
      )}

      {uploadSuccess && (
        <p className="success-message">
          {`File ${selectedFile && selectedFile.name} uploaded successfully!`}
        </p>
      )}

      {/* File preview */}
      {selectedFile && (
        <div className="file-preview">
          <p>Selected File: {selectedFile.name}</p>
          <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      <div className="feat-summaries-container">
        <FeatSummaries />
      </div>
    </div>
  );
}

export default UploadFeature;
