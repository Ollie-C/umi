import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__link" to="/">
        Home
      </NavLink>
      <NavLink className="navbar__link" to="/login">
        Login
      </NavLink>
    </nav>
  );
};

export default Navbar;
