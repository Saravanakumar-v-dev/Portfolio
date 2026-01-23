import axios from "axios";

const api = axios.create({
  baseURL: "/api", // backend root
  timeout: 8000,
});

// Example API functions:

export const sendMessage = (payload) => api.post("/contact", payload);

export const getProjects = () => api.get("/projects");

export const getPinnedRepos = (username) =>
  api.get(`/github/pinned?user=${username}`);

export default api;
