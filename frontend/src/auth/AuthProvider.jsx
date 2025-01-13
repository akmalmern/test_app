// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import api from "../api"; // API ni mos ravishda import qiling

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Kirish funksiyasi
//   const login = async (email, password) => {
//     try {
//       const { data } = await api.post("/signin", { email, password });
//       if (data.success === true) {
//         toast.success(data.message);
//         localStorage.setItem("token", data.accessToken);
//         setUser(data.user); // Foydalanuvchi ma'lumotlarini saqlash
//         setTimeout(() => {
//           navigate("/"); // Asosiy sahifaga o'tish
//         }, 1000);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.error || "Serverda noma'lum xatolik yuz berdi"
//       );
//     }
//   };

//   // Chiqish funksiyasi
//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/login");
//   };

//   // Dastlabki foydalanuvchi holatini tekshirish
//   useEffect(() => {
//     const checkUser = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           // API orqali foydalanuvchi ma'lumotlarini olish
//           const response = await api.get("/");
//           setUser(response.data.user); // Foydalanuvchi holatini yangilash
//         } catch (error) {
//           console.error("Token tasdiqlashda xatolik:", error.message);
//           logout(); // Token noto‘g‘ri bo‘lsa, tizimdan chiqish
//         }
//       }
//       setLoading(false); // Yuklanish holatini o'chirish
//     };

//     checkUser(); // Foydalanuvchi tekshirishni chaqirish
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
