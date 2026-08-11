import axios from "axios";

const API_BASE_URL =
  "https://script.google.com/macros/s/AKfycbzzdINU3kAoMKPSxJPn5UCNxyZbuSkMIkA8ve3jQVI8CF1kT1iuwvagdmns-m7wsg1R0w/exec";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (config.method === "post") {
    config.headers["Content-Type"] = "text/plain;charset=utf-8";

    if (typeof config.data !== "string") {
      config.data = JSON.stringify(config.data);
    }
  }

  return config;
});

export default api;