import "./Search.scss";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Map from "../../components/Map/Map";
import Card from "../../components/Card/Card";

const Search = () => {
  const { REACT_APP_GM_API_KEY } = process.env;
  const originCoffeeAddress = {
    address: "65 Charlotte Rd, London EC2A 3PE",
    lat: 51.52653572916955,
    lng: -0.08113255926569261,
  };

  return (
    <>
      <CategoryBar />
      <div className="search">
        <div className="search__map">
          <Map
            apiKey={REACT_APP_GM_API_KEY}
            location={originCoffeeAddress}
            zoomLevel={15}
          />
        </div>

        <div className="search__listings">
          <h2 className="search__header">8 RESULTS:</h2>
          <div className="cards-wrapper">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
