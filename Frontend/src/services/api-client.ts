import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_BASE_URL,
});
