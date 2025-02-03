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
function App() {
  const location = useLocation(); // 📌 Joriy sahifani aniqlash

  // 📌 Agar sahifa "/login" yoki "/register" bo‘lsa, Navbar ko‘rinmaydi
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <ToastContainer />
      {!hideNavbar && <Navbar />}{" "}
      {/* ✅ Navbar faqat kerakli joylarda chiqadi */}
      <Routes>
        {/* Login va Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Faqat login bo‘lgan userlar uchun */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/test/:testId" element={<TestYechish />} />
          <Route path="/results" element={<UserTestResult />} />
        </Route>

        {/* Faqat admin uchun */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<CreateTest />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
