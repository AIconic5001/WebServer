import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

// Use centralized API config
const API_CONFIG = {
  UPLOAD: "/api/upload",
  FILES: "/api/files",
};

// Allowed file types matching backend
const ALLOWED_TYPES = ["txt", "pdf", "png", "jpg", "jpeg", "gif"];

const UploadFeature = () => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Improved file validation
  const validateFile = (file: File): boolean => {
    if (!file) return false;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !ALLOWED_TYPES.includes(extension)) {
      setFileError(`Invalid file type. Allowed types: ${ALLOWED_TYPES.join(', ')}`);
      return false;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
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
      console.error("Upload error:", error.response?.data?.error || error.message);
    }
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

  return (
    <div className="upload-section">
      <div className="file-input-group">
        <input
          type="file"
          onChange={handleFileSelect}
          className="file-input"
          accept={ALLOWED_TYPES.map(t => `.${t}`).join(',')}
        />
        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploadMutation.isPending}
          className="upload-button"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload File"}
        </button>
      </div>

      {/* Error messaging */}
      {fileError && <p className="error-message">{fileError}</p>}
      
      {/* Upload status */}
      {uploadMutation.isError && (
        <p className="error-message">
          Error: {uploadMutation.error?.response?.data?.error || "Upload failed"}
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
    </div>
  );
};

export default UploadFeature;