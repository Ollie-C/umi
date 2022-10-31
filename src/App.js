import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./fb-config";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
