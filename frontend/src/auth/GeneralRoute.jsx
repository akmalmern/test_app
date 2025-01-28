import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api"; // Backend API uchun

const RoleBasedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user-profile"); // Foydalanuvchi ma'lumotlarini olish
        setUser(data.user);
      } catch (error) {
        console.error("Xato:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>; // Yuklanayotgan holat
  if (!user) return <Navigate to="/login" />; // Agar foydalanuvchi mavjud bo'lmasa, login sahifasiga

  // Foydalanuvchi roli asosida yo'naltirish
  if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
  if (user.role === "user") return <Navigate to="/user/dashboard" />;

  return null; // Agar rol nomalum bo'lsa, hech narsa qaytarmaymiz
};

export default RoleBasedRoute;
