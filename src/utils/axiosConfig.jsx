import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const axiosConfig = axios.create({
  baseURL: API_URL,
});

export default axiosConfig;
