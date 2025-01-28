// // PrivateRoute.js
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   // LocalStorage'dan tokenni o'qish
//   const token = localStorage.getItem("token");

//   // Agar token mavjud bo'lsa, ichki yo'nalishlarni ko'rsatamiz, aks holda login sahifasiga yo'naltiramiz
//   return token ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import api from "../api";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/user-profile"); // Tokenni server orqali tekshirish
        setIsAuthenticated(true); // Token to'g'ri bo'lsa, autentifikatsiya o'rnatiladi
      } catch (error) {
        console.error("Autentifikatsiya xatoligi:", error);
        setIsAuthenticated(false); // Token noto'g'ri bo'lsa, autentifikatsiya o'chiriladi
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Yuklanish paytidagi UI
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
