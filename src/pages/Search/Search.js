import "./Search.scss";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../../components/Map/Map";

const Search = () => {
  const { REACT_APP_GM_API_KEY } = process.env;
  const originCoffeeAddress = {
    address: "65 Charlotte Rd, London EC2A 3PE",
    lat: 51.52653572916955,
    lng: -0.08113255926569261,
  };

  return (
    <div className="search">
      <div className="search__map">
        <Map
          apiKey={REACT_APP_GM_API_KEY}
          location={originCoffeeAddress}
          zoomLevel={15}
        />
      </div>

      <div className="search__listings"></div>
    </div>
  );
};

export default Search;
