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

// Interceptor qo'shish
// api.interceptors.response.use(
//   (response) => response, // Muvaffaqiyatli javoblarni qaytarish
//   (error) => {
//     // Xatolikni konsolda ko'rsatmaslik
//     const errorMessage =
//       error.response?.data?.error ||
//       "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
//     toast.error(errorMessage);
//     return Promise.reject(error); // Xatolikni qaytarish (agar kerak bo'lsa)
//   }
// );

export default api;
