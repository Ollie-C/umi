import "./styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//PAGES
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import Establishment from "./pages/Establishment/Establishment";
import { AuthProvider } from "./context/AuthContext";
import Connect from "./pages/Connect/Connect";
import Exchange from "./pages/Exchange/Exchange";
//COMPONENTS
import Restricted from "./components/Restricted/Restricted";
import EstablishmentDashboard from "./pages/EstablishmentDashBoard/EstablishmentDashboard";
import Collect from "./pages/Collect/Collect";
import Layout from "./components/Shared/Layout";

const App = () => {
  const [searchedPlace, setSearchedPlace] = useState(null);

  const handleSearchSubmit = (searchTerm) => {
    setSearchedPlace(searchTerm);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <main className="main">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Home handleSearchSubmit={handleSearchSubmit} />}
              ></Route>
              <Route path="/:establishmentId" element={<Establishment />} />

              <Route
                path="/profile"
                element={
                  <Restricted>
                    <Profile />
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
              <Route
                path="/dashboard/:id"
                element={<EstablishmentDashboard />}
              ></Route>
              <Route path="/:id/collect/:token" element={<Collect />} />
              <Route path="/exchange" element={<Exchange />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
