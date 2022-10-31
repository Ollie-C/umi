import { Link } from "react-router-dom";
import "./Home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="home__left">
        <h1 className="home__header">Ecolocation: Earth's Loyalty Card</h1>
        <p className="home__description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          repellendus obcaecati, autem praesentium culpa doloribus.
        </p>
        <Link className="home__button" to="/login">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Home;
