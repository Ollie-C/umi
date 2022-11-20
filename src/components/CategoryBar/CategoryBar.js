import "./CategoryBar.scss";
//icons
import zeroWaste from "../../assets/icons/zeroWaste.png";
import local from "../../assets/icons/place.png";
import plantBased from "../../assets/icons/vegan.png";

const CategoryBar = () => {
  return (
    <nav className="categoryBar">
      <button className="categoryBar__button categoryBar__button--extra categoryBar__button--all">
        ALL
      </button>
      <button className="categoryBar__button">PLANT-BASED</button>
      <button className="categoryBar__button">HOME-MADE</button>
      <button className="categoryBar__button">ORGANIC</button>
      <button className="categoryBar__button">ZERO-WASTE</button>
      <button className="categoryBar__button categoryBar__button--extra">
        ORIGIN
      </button>
      <img className="categoryBar__icon" src={zeroWaste} alt="zerowaste icon" />
      <img
        className="categoryBar__icon"
        src={plantBased}
        alt="plant based icon"
      />
      <img className="categoryBar__icon" src={local} alt="local icon" />
    </nav>
  );
};

export default CategoryBar;
