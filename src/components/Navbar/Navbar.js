import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { Icon } from "@iconify/react";

const Navbar = ({ isLoggedIn, signUserOut }) => {
  return (
    <nav className="navbar">
      <NavLink className="navbar__home" to="/"></NavLink>
      {!isLoggedIn ? (
        <NavLink className="navbar__link" to="/login">
          LOGIN
        </NavLink>
      ) : (
        <>
          <form className="navbar__search">
            <input
              type="text"
              className="navbar__searchbar"
              placeholder="Where are you looking?"
              name="search"
            ></input>
            <select name="category" className="navbar__select">
              <option value="Cafe">Cafe</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Groceries">Groceries</option>
              <option value="Retail">Retail</option>
            </select>
            <Icon
              className="navbar__arrow"
              icon="uil:location-point"
              width="50"
            />
          </form>
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
