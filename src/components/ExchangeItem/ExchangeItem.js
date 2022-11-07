import "./ExchangeItem.scss";
import sapling from "../../assets/images/sapling.jpg";
import { Icon } from "@iconify/react";

const ExchangeItem = () => {
  return (
    <div className="itemcard">
      <div className="itemcard__section">
        <img className="itemcard__image" src={sapling} alt="sapling" />
      </div>
      <div className="itemcard__section">
        <h1 className="itemcard__header">Plant a tree</h1>
        <Icon icon="akar-icons:coin" />
        <p className="itemcard__points">200</p>
      </div>
    </div>
  );
};

export default ExchangeItem;
