import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/umi_logo-white2.png";
import { Icon } from "@iconify/react";
import { UserAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="umi-logo"
        className="logo"
      />

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
