import "./CategoryBar.scss";

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
      <button className="categoryBar__button categoryBar__button--extra">
        RECYCLE
      </button>
    </nav>
  );
};

export default CategoryBar;
