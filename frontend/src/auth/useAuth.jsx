import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = async () => {
      const token = localStorage.getItem("token"); // Tokenni olish

      if (!token) {
        // Agar token mavjud bo'lmasa, login sahifasiga o'tish
        navigate("/login");
        return;
      }

      try {
        const { data } = await api.get("/user-profile");
        setUser(data.user);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token"); // Tokenni o'chirish
          navigate("/login"); // Agar 401 bo‘lsa, login sahifaga yo‘naltiramiz
        }
        toast.error(error.response.data.error);
      }
    };
    userProfile();
  }, []);

  return user;
};

export default useAuth;
