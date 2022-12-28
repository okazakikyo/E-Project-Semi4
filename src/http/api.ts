import axios, { AxiosInstance } from "axios";
import moment from "moment-timezone";
import { createApp } from "vue";
import App from "@/App.vue";

const headers = {};
headers["Content-type"] = "application/json";
export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: headers,
  });