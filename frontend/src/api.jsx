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
        const { data } = await axios.post(
          "http://localhost:5000/refresh-token",
          {},
          { withCredentials: true }
        );
        console.log("ddata1", data);
        return api(originalRequest); // Asliy so'rovni qayta yuborish
      } catch (refreshError) {
        // Agar refresh ham muvaffaqiyatsiz bo'lsa
        console.error("Refresh token xatosi:", refreshError);
        toast.error(refreshError.response.data.error); // Xato xabarini ko'rsatish
        localStorage.removeItem("accessToken");

        window.location.href = "/login"; // Login sahifasiga yo‘naltirish
      }
    }
    return Promise.reject(error); // Agar boshqa xato bo‘lsa, qaytarish
  }
);

export default api; // axios instance'ni eksport qilish
