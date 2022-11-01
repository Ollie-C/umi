import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./fb-config";
//PAGES
import Home from "./pages/Home/Home";
import SignUp from "./pages/Sign up/SignUp";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import UsePoints from "./pages/Use Points/UsePoints";
//COMPONENTS
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);

  const signUserOut = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.pathname = "/login";
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} signUserOut={signUserOut} />
      <main className="main">
        <div className="app-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            ></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            ></Route>
            <Route
              path="/profile"
              element={<Profile isLoggedIn={isLoggedIn} />}
            ></Route>
            <Route
              path="/usepoints"
              element={<UsePoints isLoggedIn={isLoggedIn} />}
            ></Route>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
