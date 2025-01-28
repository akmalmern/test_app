// import { ToastContainer } from "react-toastify";
// import "./App.css";
// import Register from "./components/Register";
// import { Route, Routes } from "react-router-dom";
// import Login from "./components/Login";
// import Home from "./pages/Home";
// import NotFound from "./components/NotFound";
// import PrivateRoute from "./auth/PrivateRoute";
// // import SingleTest from "./components/SingleTest";
// import TestYechish from "./components/TestYechish";
// import UserTestResults from "./pages/UserTestResults";
// import AdminLayout from "./auth/AdminRoute";
// import CreateTest from "./pages/admin/CreateTest";

// function App() {
//   return (
//     <>
//       <ToastContainer />

//       <Routes>
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         {/* PrivateRoute orqali ichki yo'nalishlar */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route path="/admin" element={<CreateTest />} />
//         </Route>
//         <Route path="/" element={<PrivateRoute />}>
//           {/* Bolalar sahifalari */}
//           <Route path="/" element={<Home />} />
//           <Route path="/teststart/:testId" element={<TestYechish />} />
//           <Route path="/results" element={<UserTestResults />} />
//           {/* <Route path="dashboard" element={<Dashboard />} /> */}
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import AdminLayout from "./auth/AdminRoute";
import UserLayout from "./auth/UserRoute";
import RoleBasedRoute from "./auth/GeneralRoute";

function App() {
  return (
    <Routes>
      {/* Login va Register sahifalari */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Roli asosida yo'naltirish */}
      <Route path="/" element={<RoleBasedRoute />} />

      {/* Admin uchun marshrutlar */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<h1>Admin Dashboard</h1>} />
        <Route path="users" element={<h1>Users Management</h1>} />
        <Route path="settings" element={<h1>Admin Settings</h1>} />
      </Route>

      {/* User uchun marshrutlar */}
      <Route path="/user" element={<UserLayout />}>
        <Route path="dashboard" element={<h1>User Dashboard</h1>} />
        <Route path="profile" element={<h1>User Profile</h1>} />
        <Route path="tests" element={<h1>User Tests</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
