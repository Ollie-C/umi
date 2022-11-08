import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const Navbar = ({ handleSearchSubmit }) => {
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (e) => {
    setAddress(e.target.value);
  };

  return (
    <nav className="navbar">
      <NavLink className="navbar__home" to="/"></NavLink>
      <h1 className="navbar__logo">u m i .</h1>
      {!user ? (
        <NavLink className="navbar__link" to="/login">
          LOGIN
        </NavLink>
      ) : (
        <>
          <form id="searchForm" className="navbar__search">
            <input
              type="text"
              className="navbar__searchbar"
              placeholder="Search a city ..."
              name="search"
              onChange={changeHandler}
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
              icon="majesticons:map-marker-area"
              width="40"
              onClick={(e) => {
                e.preventDefault();
                handleSearchSubmit(address);
                navigate(`search/${address}`);
              }}
            />
          </form>
          <NavLink className="navbar__link" to="/profile">
            PROFILE
          </NavLink>
          <NavLink className="navbar__link" to="/exchange">
            EXCHANGE
          </NavLink>
          <button onClick={handleLogOut} className="navbar__logout">
            LOGOUT
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
