import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await api.get("/user-profile");
        setUser(data.user);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401 || error.response?.status === 500) {
          localStorage.removeItem("token");
          navigate("/login");
        }
        toast.error(error.response?.data?.error);
      }
    };
    userProfile();
  }, [navigate]);

  return user;
};

export default useAuth;
