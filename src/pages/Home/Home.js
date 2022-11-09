import { NavLink } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { UserAuth } from "../../context/AuthContext";
import "./Home.scss";
import { useEffect } from "react";
import loyaltycard from "../../assets/images/umi_loyalitycard-kraft.png";
import umi from "../../assets/images/umi_logo-blue2.png";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Home = ({ handleSearchSubmit }) => {
  const { user } = UserAuth();
  const [address, setAddress] = useState();
  const navigate = useNavigate();

  const processNewUser = async (id) => {
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
      console.log("User exists");
      return;
    }
    console.log(docSnap.data());
    await setDoc(doc(db, "users", id), userDetails);
  };

  const changeHandler = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (user) processNewUser(user.uid);
  }, []);

  return (
    <>
      <div className="home-wrapper"></div>
      <div className="home">
        <div className="home__top">
          <section className="home__left">
            <div className="home__image-wrapper">
              <img
                className="home__loyaltycard"
                src={loyaltycard}
                alt="umi-loyalty-card-image"
              />
            </div>
          </section>
          <section className="home__right">
            {user && <h1>Welcome back, {user.displayName}</h1>}
            {/* <img src={umi} alt="" /> */}
            <h1 className="home__title">Earth's Loyalty Card</h1>
            <p className="home__text">
              Earn points when choosing an eco-friendly alternative.
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
                  placeholder="Search a city ..."
                  name="search"
                  onChange={changeHandler}
                ></input>
                {/* <select name="category" className="home__select">
              <option value="Cafe">Cafe</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Groceries">Groceries</option>
              <option value="Retail">Retail</option>
            </select> */}
                <Icon
                  type="submit"
                  form="searchForm"
                  className="home__arrow"
                  icon="majesticons:map-marker-area"
                  width="40"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearchSubmit(address);
                    navigate(`search/${address}`);
                  }}
                />
              </form>
            )}
          </section>
          <div className="initiatives">
            <NavLink className="initiatives__link" to="/exchange">
              Sustainable initiatives
            </NavLink>
            <Icon icon="dashicons:arrow-down" color="white" height="40" />
          </div>
        </div>

        {/* <div className="home__left">
          <h1 className="home__header">umi: Earth's Loyalty Card App</h1>
          <p className="home__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
          {!user && (
            <Link className="home__button" to="/login">
              GET STARTED
            </Link>
          )}
        </div>
        <div className="home__right">
          <img className="home__elephant" src={elephant} alt="elephant" />
        </div>
      </div>
      <section className="about">
        <div className="about__left">
          <h1 className="about__header">Earn umi Points</h1>
          <p className="about__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
        </div>
      </section>
      <section className="initiatives">
        <div className="about__left">
          <h1 className="about__header">Earn umi Points</h1>
          <p className="about__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
        </div> */}
      </div>
    </>
  );
};

export default Home;
