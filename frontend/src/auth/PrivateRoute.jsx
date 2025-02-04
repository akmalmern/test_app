// import { Navigate, Outlet } from "react-router-dom";
// import useAuth from "./useAuth";

// const PrivateRoute = () => {
//   const user = useAuth();

//   if (user === null) return <p>Loading...</p>; // Ma'lumot yuklanayotganda kutish uchun

//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// const AdminRoute = () => {
//   const user = useAuth();
//   if (user === null) return <p>Loading...</p>; // Ma'lumot yuklanayotgan bo‘lsa, kutish

//   return user && user.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
// };

// export { PrivateRoute, AdminRoute };
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const PrivateRoute = () => {
  const user = useAuth();

  if (user === null) {
    return <p>Loading...</p>; // ⏳ Autentifikatsiya jarayonida kutish
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute = () => {
  const user = useAuth();

  if (user === null) {
    return <p>Loading...</p>; // ⏳ Autentifikatsiya jarayonida kutish
  }

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export { PrivateRoute, AdminRoute };
