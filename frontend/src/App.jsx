import { Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { AdminRoute, PrivateRoute } from "./auth/PrivateRoute";
import Home from "./pages/Home";
import CreateTest from "./pages/admin/CreateTest";
import TestYechish from "./components/TestYechish";
import UserTestResult from "./pages/UserTestResults";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCategory from "./pages/admin/AdminCategory";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AdminTestlar from "./pages/admin/AdminTestlar";
import EditTest from "./pages/admin/EditTest";
import "./index.css"; // yoki "./tailwind.css"

const OfflinePage = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h1 style={{ color: "red" }}>Internet aloqasi yo‘q</h1>
    <p>Iltimos, internet aloqangizni tekshiring va sahifani yangilang.</p>
  </div>
);
function App() {
  const location = useLocation();
  // internet o'chib qolsa chiqadigan sahifalar uchun
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return <OfflinePage />;
  }

  // 📌 Agar sahifa "/login" yoki "/register" bo‘lsa, Navbar ko‘rinmaydi
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <ToastContainer />
      {!hideNavbar && <Navbar />}{" "}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/test/:testId" element={<TestYechish />} />
          <Route path="/results" element={<UserTestResult />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<CreateTest />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/testlar" element={<AdminTestlar />} />
          <Route path="/admin/edit-test/:id" element={<EditTest />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
