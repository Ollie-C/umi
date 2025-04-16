import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../fb-config';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const logIn = async () => {
    try {
      setLoading(true);
      // Set auth persistence to LOCAL to keep user signed in
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();

      // Use popup instead of redirect to avoid navigation issues
      const result = await signInWithPopup(auth, provider);
      console.log('Successful popup sign-in', result.user.uid);
      return result;
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(
        'Auth state changed:',
        currentUser ? `User logged in: ${currentUser.uid}` : 'No user'
      );
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    authError,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, UserAuth };
