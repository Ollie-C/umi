import "./ExchangeItem.scss";
import sapling from "../../assets/images/sapling.jpg";
import coin from "../../assets/images/unnamed.png";

const ExchangeItem = ({ item }) => {
  return (
    <div className="itemcard">
      <div className="itemcard__section">
        <img className="itemcard__image" src={sapling} alt="sapling" />
      </div>
      <div className="itemcard__section">
        <h1 className="itemcard__header">{item.name}</h1>
        <div className="itemcard__bottom">
          <img className="itemcard__coin" src={coin} alt="" />
          <p className="itemcard__points">{item.cost}</p>
        </div>
      </div>
    </div>
  );
};

export default ExchangeItem;
