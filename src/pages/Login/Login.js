import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import logo from '../../assets/images/umi_logo-black.png';

import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const { logIn, user, loading, authError } = UserAuth();
  const [error, setError] = useState(null);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const handleLogIn = async () => {
    try {
      setError(null);
      setLoginAttempted(true);
      console.log('Attempting to log in with Google via popup...');
      const result = await logIn();
      console.log('Login successful, user:', result?.user?.email);
    } catch (error) {
      console.error('Login error in component:', error);
      setError(error.message || 'Failed to log in. Please try again.');
    } finally {
      setLoginAttempted(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User logged in, redirecting to home page');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className='login'>
      <div className='login__card'>
        <h1 className='login__header'>Welcome to</h1>
        <img className='login__logo' src={logo} alt='umi logo' />
        <button
          className='login__google'
          onClick={handleLogIn}
          disabled={loading || loginAttempted}>
          {loading || loginAttempted ? 'LOGGING IN...' : 'LOG IN WITH GOOGLE'}
        </button>
        {error && <p className='login__error'>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
