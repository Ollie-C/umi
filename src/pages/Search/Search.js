import "./Search.scss";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Search = () => {
  return (
    <div className="search">
      <div className="search__map"></div>
      <div className="search__listings"></div>
    </div>
  );
};

export default Search;
