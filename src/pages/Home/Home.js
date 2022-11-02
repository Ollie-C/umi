import { Link } from "react-router-dom";
import elephant from "../../assets/images/elephant.svg";
import earth from "../../assets/images/earth.png";
import "./Home.scss";
const Home = ({ isLoggedIn }) => {
  return (
    <>
      <div className="home">
        <div className="home__left">
          <h1 className="home__header">Ecolocation: Earth's Loyalty Card</h1>
          <p className="home__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
          {!isLoggedIn && (
            <Link className="home__button" to="/login">
              GET STARTED
            </Link>
          )}
        </div>
        <div className="home__right">
          <img className="home__elephant" src={elephant} alt="elephant" />
        </div>
      </div>
      <div className="home">
        <div className="home__right">
          <img className="home__earth" src={earth} alt="earth" />
        </div>
        <div className="home__left">
          <h1 className="home__header">Lorem ipsum dolor sit amet.</h1>
          <p className="home__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
          {!isLoggedIn && (
            <Link className="home__button" to="/login">
              GET STARTED
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
