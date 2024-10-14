import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://e-commerze.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
