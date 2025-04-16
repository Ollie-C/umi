import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Layout.scss';

const Layout = ({ handleSearchSubmit }) => {
  return (
    <div className='layout'>
      <Navbar handleSearchSubmit={handleSearchSubmit} />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
