import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Layout = ({ handleSearchSubmit }) => {
  return (
    <>
      <Navbar handleSearchSubmit={handleSearchSubmit} />
      <Outlet />
    </>
  );
};

export default Layout;
