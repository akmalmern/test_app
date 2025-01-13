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

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/teststart/:testId"
          element={
            <PrivateRoute>
              <SingleTest />
            </PrivateRoute>
          }
        /> */}
        <Route
          path="/teststart/:testId"
          element={
            <PrivateRoute>
              <TestYechish />
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
