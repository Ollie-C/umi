import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/umi_logo-white.png";
import { Icon } from "@iconify/react";

import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="umi-logo"
        className="logo"
      />

      {/* {user && (
        <Icon
          onClick={() => navigate("/exchange")}
          className="user__icon"
          icon="majesticons:coins"
          color="black"
          height="40"
        />
      )} */}

      <div className="user__wrapper">
        <Icon
          onClick={() => (user ? navigate("/profile") : navigate("/login"))}
          className="user__icon"
          icon="bxs:user-circle"
          height="35"
        />
      </div>
    </nav>
  );
};

export default Navbar;
