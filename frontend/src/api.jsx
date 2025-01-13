import axios from "axios";
// import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Backend API manzili
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  withCredentials: true, // Cookie'larni uzatish uchun
});

// // Request interceptor (agar kerak bo'lsa)
// api.interceptors.request.use((config) => {
//   console.log("Request yuborilyapti:", config);
//   return config;
// });

// Response interceptor (xatoliklarni boshqarish)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     toast.error(error.response.data.error);
//     return Promise.reject(error);
//   }
// );

export default api;
