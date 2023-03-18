import { useNavigate } from "react-router-dom";
//Styles
import "./Navbar.scss";
//Context
import { UserAuth } from "../../context/AuthContext";
//Images & Icons
import logo from "../../assets/images/umi_logo-blue1.png";

const Navbar = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__logo-wrapper">
        <img
          onClick={() => navigate("/")}
          src={logo}
          alt="umi logo"
          className="navbar__logo"
        />
      </div>

      <div className="navbar__user">
        <button
          onClick={() => (user ? navigate("/profile") : navigate("/login"))}
          className="navbar__button"
          alt="user icon"
        >
          PROFILE
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
