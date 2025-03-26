import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../src/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    const handleLogout = async () => {

      await logout();
        
      navigate("/");
    };

    handleLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
