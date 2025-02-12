import axios from "axios";
import { toast } from "react-toastify";

// axios instansiyasini yaratish
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true, // Cookie orqali autentifikatsiya qilish
});

// Response interceptor
api.interceptors.response.use(
  (response) => response, // Javob muvaffaqiyatli bo‘lsa, shunchaki qaytarish
  async (error) => {
    const originalRequest = error.config;

    // Agar 401 bo'lsa va bu refresh token emas bo'lsa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Bir marta qayta urinib ko'radi

      try {
        // Refresh token orqali yangi token olish
        await axios.post(
          "http://localhost:5000/refresh-token",
          {},
          { withCredentials: true }
        );
        // const { accessToken } = refreshResponse.data;

        //         localStorage.setItem('accessToken', accessToken); // LocalStorage ga saqlash

        return api(originalRequest); // Asliy so'rovni qayta yuborish
      } catch (refreshError) {
        // Agar refresh ham muvaffaqiyatsiz bo'lsa
        toast.error("Sessiya tugadi. Qaytadan login qiling!"); // Xato xabarini ko'rsatish
        localStorage.removeItem("accessToken");
        //         // Login sahifasiga yo'naltirish
        //         window.location.href = '/login';
        //         toast.error("Iltimos, qayta kiring!");
        window.location.href = "/login"; // Login sahifasiga yo‘naltirish
      }
    }
    return Promise.reject(error); // Agar boshqa xato bo‘lsa, qaytarish
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshResponse = await api.post('/refresh_token'); // Refresh token so'rovi
//         const { accessToken } = refreshResponse.data;

//         localStorage.setItem('accessToken', accessToken); // LocalStorage ga saqlash
//         api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Header ga qo'shish
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Qayta so'rov uchun

//         return api(originalRequest); // Qayta so'rov
//       } catch (err) {
//         // Refresh token ishlamasa yoki muddati tugagan bo'lsa
//         localStorage.removeItem('accessToken');
//         // Login sahifasiga yo'naltirish
//         window.location.href = '/login';
//         toast.error("Iltimos, qayta kiring!");
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // ... Komponentlarda api dan foydalanish

export default api; // axios instance'ni eksport qilish
