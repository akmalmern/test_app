import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = () => {
  const user = useAuth();

  if (user === null) {
    return <p>Loading...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const user = useAuth();

  if (user === null) {
    return <p>Loading...</p>;
  }

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export { PrivateRoute, AdminRoute };
