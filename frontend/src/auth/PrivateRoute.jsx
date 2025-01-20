// PrivateRoute.js
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // LocalStorage'dan tokenni o'qish
  const token = localStorage.getItem("token");

  // Agar token mavjud bo'lsa, ichki yo'nalishlarni ko'rsatamiz, aks holda login sahifasiga yo'naltiramiz
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
