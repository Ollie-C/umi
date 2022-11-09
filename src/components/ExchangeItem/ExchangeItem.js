import "./ExchangeItem.scss";
import sapling from "../../assets/images/sapling.jpg";
import coin from "../../assets/images/unnamed.png";
import { Icon } from "@iconify/react";

const ExchangeItem = ({ item }) => {
  return (
    <>
      <div className="item">
        <img src={sapling} alt="image of sapling" className="item__image" />
        <div className="item__top">
          <h2 className="item__title">{item.name}</h2>
          <img className="item__coin" src={coin} alt="" />
          <p className="item__points">20</p>
        </div>
        <div className="item__description">
          <p className="item__text">Lorem ipsum dolor sit amet.</p>
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
