import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { AdminRoute, PrivateRoute } from "./auth/PrivateRoute";
import Home from "./pages/Home";
import CreateTest from "./pages/admin/CreateTest";

function App() {
  return (
    <Routes>
      {/* Login va Register */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Faqat login bo‘lgan userlar uchun */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Faqat admin uchun */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<CreateTest />} />
      </Route>
    </Routes>
  );
}

export default App;
