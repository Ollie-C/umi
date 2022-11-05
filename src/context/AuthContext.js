import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../fb-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const logIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const setAuthStatus = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      setAuthStatus();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, UserAuth };
