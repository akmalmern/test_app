import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await api.get("/user-profile");
        console.log("Profile data+:", data.user);
        setUser(data.user);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    userProfile();
  }, []);

  return user;
};

export default useAuth;
