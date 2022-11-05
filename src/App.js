import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState } from "react";
//PAGES
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import UsePoints from "./pages/Use Points/UsePoints";
import Search from "./pages/Search/Search";
import Establishment from "./pages/Establishment/Establishment";
import { AuthProvider, UserAuth } from "./context/AuthContext";
import Connect from "./pages/Connect/Connect";
//COMPONENTS
import Navbar from "./components/Navbar/Navbar";
import Restricted from "./components/Restricted/Restricted";

const App = () => {
  const [searchedPlace, setSearchedPlace] = useState(null);

  const handleSearchSubmit = (searchTerm) => {
    setSearchedPlace(searchTerm);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar handleSearchSubmit={handleSearchSubmit} />
        <main className="main">
          <div className="app-wrapper">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/:establishmentId" element={<Establishment />} />

              <Route path="/login" element={<Login />} />
              <Route
                path="/profile"
                element={
                  <Restricted>
                    <Profile />
                  </Restricted>
                }
              />
              <Route
                path="/usepoints"
                element={
                  <Restricted>
                    <UsePoints />
                  </Restricted>
                }
              />
              <Route
                path="/search"
                element={
                  <Restricted>
                    <Search />
                  </Restricted>
                }
              />
              <Route
                path="/search/:location"
                element={
                  <Restricted>
                    <Search searchedPlace={searchedPlace} />
                  </Restricted>
                }
              />
              <Route
                path="/add"
                element={
                  <Restricted>
                    <Connect />
                  </Restricted>
                }
              />
            </Routes>
          </div>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
