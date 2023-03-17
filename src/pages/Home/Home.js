//Styles
import "./Home.scss";
//Firebase & context
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { UserAuth } from "../../context/AuthContext";
//images
import loyaltycard from "../../assets/images/loyaltycard_new.png";
import umiPhone from "../../assets/images/umi_top.png";
//icons
import { Icon } from "@iconify/react";
//Hooks
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Initiatives from "../../components/Initiatives/Initiatives";

const Home = ({ handleSearchSubmit }) => {
  const { user } = UserAuth();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const ref = useRef(null);

  const processNewUser = async (id) => {
    try {
      const userDetails = {
        email: user.email,
        name: user.displayName,
        points: 0,
        totalPoints: 0,
        transactions: [],
        initiatves: [],
        joined: Date.now(),
        establishmentId: false,
      };
      const userDocRef = doc(db, "users", id);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.data()) {
        return;
      }
      await setDoc(doc(db, "users", id), userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = () => ref.current.scrollIntoView({ behavior: "smooth" });

  const changeHandler = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (user) {
      processNewUser(user.uid);
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <div className="home-wrapper"></div>
      <div className="home">
        <section className="home__left">
          {user && (
            <h1 className="username">Welcome back, {user.displayName}</h1>
          )}

          <h1 className="home__title">This is YOUR Earth Loyalty Card</h1>
          <p className="home__text">
            Earn some more points by choosing the eco-friendly alternative
            today.
          </p>
          {!user ? (
            <button onClick={() => navigate("/login")} className="home__cta">
              Get Started
            </button>
          ) : (
            <form id="searchForm" className="home__search">
              <input
                type="text"
                className="home__searchbar"
                placeholder="Search . . ."
                name="search"
                onChange={changeHandler}
              ></input>
              <select name="category" className="home__select">
                <option value="Cafe">Cafe</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Groceries">Groceries</option>
                <option value="Retail">Retail</option>
              </select>
              <button
                type="submit"
                form="searchForm"
                className="home__searchButton"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchSubmit(address);
                  navigate(`search/${address}`);
                }}
              >
                GO
              </button>
            </form>
          )}
        </section>
        <section className="home__right">
          <div className="home__image-wrapper">
            <img
              className="home__loyaltycard"
              src={loyaltycard}
              alt="umi-loyalty-card-image"
            />
          </div>
        </section>
      </div>
      <Initiatives ref={ref} />
      <div className="app">
        <button className="app__cta">Download the app</button>
        <img className="app__image" src={umiPhone} alt="umi phone app image" />
      </div>
    </>
  );
};

export default Home;
