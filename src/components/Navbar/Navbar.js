import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, signUserOut }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <NavLink className="navbar__home" to="/"></NavLink>
      {!isLoggedIn ? (
        <NavLink className="navbar__link" to="/login">
          LOGIN
        </NavLink>
      ) : (
        <>
          <form id="searchForm" className="navbar__search">
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
              type="submit"
              form="searchForm"
              className="navbar__arrow"
              icon="uil:location-point"
              width="50"
              onClick={() => navigate("/search")}
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
