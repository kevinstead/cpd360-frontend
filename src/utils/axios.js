import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true // 🔐 Send cookies (refresh token)
});

// 🚨 Auto-refresh token on 401 error
api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/api/auth/refresh");
        const newToken = res.data.accessToken;

        // Update Authorization header
        localStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

export default api;
