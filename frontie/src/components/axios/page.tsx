import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3004",
  headers: {
    "Content-Type": "application/json",
  },
});
