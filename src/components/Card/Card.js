import "./Card.scss";
import OriginCoffee from "../../assets/images/origin.PNG";
import { Icon } from "@iconify/react";
import coin from "../../assets/images/unnamed.png";

const Card = ({ result }) => {
  return (
    <>
      <div className="card">
        <img
          src={result.image ? result.image : OriginCoffee}
          alt={`${result.name} image`}
          className="card__image"
        />
        <div className="card__top">
          <h2 className="card__title">
            {result.name ? result.name : "No name."}
          </h2>
          <div className="coin-wrapper">
            <p className="card__points">20</p>
            <img className="itemcard__coin" src={coin} alt="coin icon" />
          </div>
        </div>
        <div className="card__description">
          <p>{result.category}</p>
          <p className="card__text">BYOB | ZERO-WASTE | ORGANIC</p>
          <div className="card__stats">
            <Icon icon="lucide:verified" color="black" height="20" />
            <p className="card__text">VERIFIED</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
