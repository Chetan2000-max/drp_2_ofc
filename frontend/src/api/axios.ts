import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const skipAuthUrls = ["/login/", "/new/users/"];

const shouldAttachToken = (config: any) => {
  const token = localStorage.getItem("token");
  const requestUrl = `${config.baseURL || ""}${config.url || ""}`;

  if (!token || !config.url) return false;
  return !skipAuthUrls.some((url) => requestUrl.includes(url));
};

API.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const requestUrl = `${config.baseURL || ""}${config.url || ""}`;
  const token = localStorage.getItem("token");

  console.debug("API request", requestUrl, "token present:", Boolean(token));

  if (shouldAttachToken(config)) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("is_active");
    }
    return Promise.reject(error);
  }
);

export default API;