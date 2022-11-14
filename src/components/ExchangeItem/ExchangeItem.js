import "./ExchangeItem.scss";
import sapling from "../../assets/images/sapling.jpg";
import coin from "../../assets/images/unnamed.png";
import { Icon } from "@iconify/react";

const ExchangeItem = ({ item }) => {
  return (
    <>
      <div className="item">
        <img
          src={item.image ? item.image : sapling}
          alt="image of sapling"
          className="item__image"
        />
        <div className="item__top">
          <h2 className="item__title">{item.name}</h2>
          <img className="item__coin" src={coin} alt="coin icon" />
          <p className="item__points">{item.cost}</p>
        </div>
        <div className="item__description">
          <div className="item__stats">
            <Icon icon="lucide:verified" color="black" height="20" />
            <p className="item__text">AVAILABLE</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExchangeItem;
