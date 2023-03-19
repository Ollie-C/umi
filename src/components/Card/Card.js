import "./Card.scss";
import OriginCoffee from "../../assets/images/origin.PNG";
import { Icon } from "@iconify/react";
import coin from "../../assets/images/unnamed.png";

const Card = ({ result }) => {
  return (
    <div className="card">
      <div
        className="card__image"
        style={{
          backgroundImage: `url(${result.image ? result.image : OriginCoffee})`,
        }}
      ></div>

      <div className="card__contents">
        <h2 className="card__title">
          {result.name ? result.name : "No name."}
        </h2>
        <div className="card__description">
          <p>{result.category ? result.category : "Other"}</p>
          <p className="card__text">BYOB | ZERO-WASTE | ORGANIC</p>
          <div className="card__bottom">
            <div className="card__bottom-section">
              <Icon icon="lucide:verified" color="black" height="20" />
              <p className="card__text">VERIFIED</p>
            </div>
            <div className="card__bottom-section">
              <p className="card__points">20</p>
              <img className="card__coin" src={coin} alt="coin icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
