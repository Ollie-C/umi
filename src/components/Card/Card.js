import "./Card.scss";
import OriginCoffee from "../../assets/images/origin.PNG";

const Card = () => {
  return (
    <>
      <div className="card">
        <img
          src={OriginCoffee}
          alt="origin-coffee-image"
          className="card__image"
        />
        <h2 className="card__title">ORIGIN COFFEE</h2>
        <div className="card__description">
          <p className="card__text">BYOB | ZERO-WASTE | ORGANIC</p>
          <div className="card__stats">
            <p className="card__text">4.7</p>
            <p className="card__text">VERIFIED</p>
          </div>
        </div>
        <div className="card__right">
          <p className="card__points">20</p>
        </div>
      </div>
      <div className="card">
        <img
          src={OriginCoffee}
          alt="origin-coffee-image"
          className="card__image"
        />
        <h2 className="card__title">ORIGIN COFFEE</h2>
        <div className="card__description">
          <p className="card__text">BYOB | ZERO-WASTE | ORGANIC</p>
          <div className="card__stats">
            <p className="card__text">4.7</p>
            <p className="card__text">VERIFIED</p>
          </div>
        </div>
        <div className="card__right">
          <p className="card__points">20</p>
        </div>
      </div>
    </>
  );
};

export default Card;