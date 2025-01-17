import { ToastContainer } from "react-toastify";
import "./App.css";
import Register from "./components/Register";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import PrivateRoute from "./auth/PrivateRoute";
// import SingleTest from "./components/SingleTest";
import TestYechish from "./components/TestYechish";
import UserTestResults from "./pages/UserTestResults";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/teststart/:testId"
          element={
            <PrivateRoute>
              <TestYechish />
            </PrivateRoute>
          }
        />
        <Route
          path="/results"
          element={
            <PrivateRoute>
              <UserTestResults />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
