import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = () => {
  const user = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

const AdminRoute = () => {
  const user = useAuth();
  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoute, AdminRoute };
