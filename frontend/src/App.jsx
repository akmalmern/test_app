import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { AdminRoute, PrivateRoute } from "./auth/PrivateRoute";
import Home from "./pages/Home";
import CreateTest from "./pages/admin/CreateTest";
import TestYechish from "./components/TestYechish";
function App() {
  return (
    <Routes>
      {/* Login va Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Faqat login bo‘lgan userlar uchun */}
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/teststart/:id" element={<TestYechish />} />
      </Route>

      {/* Faqat admin uchun */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="/admin" element={<CreateTest />} />
      </Route>
    </Routes>
  );
}

export default App;
