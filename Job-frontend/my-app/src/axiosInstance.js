// src/axiosInstance.js
import axios from "axios";
import { getToken } from "./authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5433/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
