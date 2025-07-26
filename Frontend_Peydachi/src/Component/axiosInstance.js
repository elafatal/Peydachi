// src/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const BASE_URL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    let token = null;

    try {
      const rawToken = Cookies.get("auth_token");
      const parsed = JSON.parse(rawToken);
      token = parsed?.access_token || null;
    } catch (e) {
      token = Cookies.get("auth_token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers && config.headers.Authorization === null) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === 401 || error.response?.status === 406) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          console.error("No refresh token available.");
          forceLogout();
          return Promise.reject(error);
        }

        const res = await axios.post(`${BASE_URL}/authentication/refresh_token`, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          }
        });

        if (res.status === 200) {
          const newAccessToken = res.data;
          Cookies.set('auth_token', JSON.stringify(newAccessToken), {
            expires: 3,
            secure: true,
            sameSite: 'Strict',
          });
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } else {
          forceLogout();
          return Promise.reject(error);
        }

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        forceLogout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


function forceLogout() {
  const currentPath = window.location.pathname;
  const isAuthPage = currentPath.includes('/login') || currentPath.includes('/signup');
  if (!isAuthPage) {
    window.location.href = '/login';
  }

  Cookies.remove('auth_token');
  Cookies.remove('refresh_token');
  localStorage.removeItem('user'); 
  localStorage.removeItem('role');
}



export default axiosInstance;
