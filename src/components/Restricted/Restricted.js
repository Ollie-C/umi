import { Navigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const Restricted = ({ children }) => {
  const { user, loading } = UserAuth();

  // Show loading indicator while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default Restricted;
