import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = async () => {
      try {
        const { data } = await api.get("/user-profile");
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
