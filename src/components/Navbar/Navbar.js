import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ isLoggedIn, signUserOut }) => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__home" to="/"></NavLink>
      {!isLoggedIn ? (
        <NavLink className="navbar__link" to="/login">
          LOGIN / SIGN UP
        </NavLink>
      ) : (
        <>
          <input
            type="text"
            className="navbar__search"
            placeholder="What do you fancy? ... "
            name="search"
          ></input>
          <NavLink className="navbar__link" to="/profile">
            PROFILE
          </NavLink>
          <NavLink className="navbar__link" to="/usepoints">
            EXCHANGE
          </NavLink>
          <button onClick={signUserOut} className="navbar__logout">
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
