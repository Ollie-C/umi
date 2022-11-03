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
import Search from "./pages/Search/Search";
import Establishment from "./pages/Establishment/Establishment";
//COMPONENTS
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState(null);
  console.log(isLoggedIn);

  const signUserOut = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.pathname = "/";
  };

  const handleSearchSubmit = (searchTerm) => {
    console.log(searchTerm);
    setSearchedPlace(searchTerm);
  };

  return (
    <BrowserRouter>
      <Navbar
        handleSearchSubmit={handleSearchSubmit}
        isLoggedIn={isLoggedIn}
        signUserOut={signUserOut}
      />
      <main className="main">
        <div className="app-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            ></Route>
            <Route path="/:establishmentId" element={<Establishment />}></Route>
            <Route
              path="/signup"
              element={<SignUp isLoggedIn={isLoggedIn} />}
            ></Route>
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
            <Route
              path="/search"
              element={<Search isLoggedIn={isLoggedIn} />}
            ></Route>
            <Route
              path="/search/:location"
              element={
                <Search searchedPlace={searchedPlace} isLoggedIn={isLoggedIn} />
              }
            ></Route>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
};

export default App;
