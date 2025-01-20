import axios from "axios";
import { toast } from "react-toastify";

// axios instansiyasini yaratish
const api = axios.create({
  baseURL: "http://localhost:5000", // Backend API manzili
  withCredentials: true, // Agar cookie ishlatilsa
});

// Request interceptor (so‘rov yuborishdan oldin tokenni qo‘shish)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Mahalliy saqlashdan tokenni olish
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Tokenni so'rovga qo'shish
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // So'rov interseptorida xato bo'lsa, xatoni qaytarish
  }
);

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
        localStorage.setItem("token", data.accessToken); // Yangi tokenni saqlash
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Asliy so'rovni qayta yuborish
      } catch (refreshError) {
        // Agar refresh ham muvaffaqiyatsiz bo'lsa
        localStorage.removeItem("token"); // Tokenni o'chirish
        toast.error("Sessiya tugadi. Qaytadan login qiling!"); // Xato xabarini ko'rsatish
        window.location.href = "/login"; // Login sahifasiga yo‘naltirish
      }
    }
    return Promise.reject(error); // Agar boshqa xato bo‘lsa, qaytarish
  }
);

export default api; // axios instance'ni eksport qilish
