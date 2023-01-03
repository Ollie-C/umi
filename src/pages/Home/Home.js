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
import zeroWaste from "../../assets/icons/zeroWaste.png";
import ecoEnergy from "../../assets/icons/eco-light.png";
import organic from "../../assets/icons/organic.png";
import local from "../../assets/icons/place.png";
import reuse from "../../assets/icons/reuse.png";
import plantBased from "../../assets/icons/vegan.png";
import handMade from "../../assets/icons/hand-made.png";
//Hooks
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  console.log(user);

  useEffect(() => {
    if (user) {
      processNewUser(user.uid);
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

          <h1 className="home__title">Earth Loyalty Card</h1>
          <p className="home__text">
            Earn points by choosing eco-friendly alternatives.
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
              <Icon
                type="submit"
                form="searchForm"
                className="home__arrow"
                icon="majesticons:map-marker-area"
                width="60"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchSubmit(address);
                  navigate(`search/${address}`);
                }}
              />
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
        <div className="initiatives">
          <p className="initiatives__link" to="#sustainable">
            Sustainable initiatives
          </p>
          <Icon
            className="initiatives__icon"
            onClick={handleScroll}
            icon="dashicons:arrow-down"
            color="white"
            height="40"
          />
        </div>
      </div>
      <div className="sustainable">
        <div className="sustainable__about" ref={ref}>
          <h2 className="sustainable__title">What is umi.card?</h2>
          <p>
            Umi 海, Japanese for ocean or sea, is a way to help people think
            about the way they shop by rewarding users for choosing an
            eco-friendly alternative to their usual choices. Umi.card skips past
            the tick-bock initiatives and filters out companies employing
            greenwashing techniques to connect with eco-friendly businesses,
            events and charities.
          </p>
        </div>

        <div className="sustainable__initiatives">
          <h2 className="sustainable__title">Sustainable Initiatives</h2>
          <div className="icons-wrapper">
            <div className="initiative-card">
              <img src={zeroWaste} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Zero waste</h3>
              <p className="initiative-card__text">
                Bulk selling in resuable packaging
              </p>
            </div>
            <div className="initiative-card">
              <img src={ecoEnergy} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Renewable Energy</h3>
              <p className="initiative-card__text">
                Majority of energy usage is from renewable sources
              </p>
            </div>
            <div className="initiative-card">
              <img src={organic} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Organic</h3>
              <p className="initiative-card__text">
                Organic or natural ingredients sustainably farmed
              </p>
            </div>
            <div className="initiative-card">
              <img src={local} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Locally-sourced</h3>
              <p className="initiative-card__text">
                Products made from ingredients sourced locally
              </p>
            </div>
            <div className="initiative-card">
              <img src={reuse} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Reuse/Upcycle/Recycle</h3>
              <p className="initiative-card__text">
                Share products and services
              </p>
            </div>
            <div className="initiative-card">
              <img src={plantBased} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Plant-based</h3>
              <p className="initiative-card__text">
                Products using minimal water to produce and are not derived from
                or contain meat or dairy
              </p>
            </div>
            <div className="initiative-card">
              <img src={handMade} className="initiative-card__icon"></img>
              <h3 className="initiative-card__name">Hand-made</h3>
              <p className="initiative-card__text">
                Products and services crafted domestically from raw materials
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="app">
        <button className="app__cta">Download the app</button>
        <img className="app__image" src={umiPhone} alt="umi phone app image" />
      </div>
    </>
  );
};

export default Home;
