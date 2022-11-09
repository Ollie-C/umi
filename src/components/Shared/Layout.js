import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const Layout = ({ handleSearchSubmit }) => {
  return (
    <>
      <Navbar handleSearchSubmit={handleSearchSubmit} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
