import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ isLoggedIn, signUserOut }) => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__link" to="/">
        Home
      </NavLink>
      {!isLoggedIn ? (
        <NavLink className="navbar__link" to="/login">
          Login
        </NavLink>
      ) : (
        <button onClick={signUserOut} className="navbar__link">
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
