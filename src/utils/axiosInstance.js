import axios from "axios";

// Create an Axios instance with base URL and default headers
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;