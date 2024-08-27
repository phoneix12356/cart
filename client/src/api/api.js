import axios from "axios";

const api = axios.create({
  baseURL: "https://cart-ps3a.vercel.app", // Set your API base URL
  withCredentials: true,
});

export default api;
