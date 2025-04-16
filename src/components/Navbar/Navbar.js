import { useNavigate, Link } from 'react-router-dom';
//Styles
import './Navbar.scss';
//Context
import { UserAuth } from '../../context/AuthContext';
//Images & Icons
import logo from '../../assets/images/umi_logo-blue1.png';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const Navbar = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add scroll effect to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className='navbar__container'>
        <div className='navbar__logo-wrapper'>
          <img
            onClick={() => navigate('/')}
            src={logo}
            alt='umi logo'
            className='navbar__logo'
          />
        </div>

        {/* Mobile menu button */}
        <div className='navbar__mobile-toggle' onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation links */}
        <div
          className={`navbar__links ${
            mobileMenuOpen ? 'navbar__links--open' : ''
          }`}>
          <Link
            to='/'
            className='navbar__link'
            onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link
            to='/search'
            className='navbar__link'
            onClick={() => setMobileMenuOpen(false)}>
            Explore
          </Link>
          {user && (
            <Link
              to='/exchange'
              className='navbar__link'
              onClick={() => setMobileMenuOpen(false)}>
              Rewards
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                navigate('/profile');
                setMobileMenuOpen(false);
              }}
              className='navbar__button navbar__button--icon'
              aria-label='User profile'>
              <Icon icon='lucide:user' className='navbar__button-icon' />
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                setMobileMenuOpen(false);
              }}
              className='navbar__button'
              aria-label='Login'>
              LOGIN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
