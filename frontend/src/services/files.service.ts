import axios from "axios";

const filesService = {
  uploadFile(file: File) {
    const url = "/api/files/upload";
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllFiles() {
    const url = "/api/files/files";
    return axios.get(url);
  },

  getFileByName(name: string) {
    const url = `/api/files/${name}`;
    return axios.get(url);
  },
};

export default filesService;
