import "./Search.scss";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Map from "../../components/Map/Map";
import Card from "../../components/Card/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ searchedPlace }) => {
  const { location } = useParams();
  const [coordinates, setCoordinates] = useState();

  const { REACT_APP_GM_API_KEY } = process.env;

  // const currentCoordinates = coordinates
  //   ? coordinates
  //   : {
  //       lat: 51.52653572916955,
  //       lng: -0.08113255926569261,
  //     };

  const getCentre = async () => {
    console.log(searchedPlace);
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedPlace}&key=${REACT_APP_GM_API_KEY}`
    );

    setCoordinates(data.results[0].geometry.location);
    console.log(data);
  };
  console.log(coordinates);

  useEffect(() => {
    getCentre();
  }, [searchedPlace]);

  if (!coordinates) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <CategoryBar />
      <div className="search">
        <div className="search__map">
          <Map
            apiKey={REACT_APP_GM_API_KEY}
            location={coordinates}
            zoomLevel={15}
          />
        </div>

        <div className="search__listings">
          <h2 className="search__header">8 results near {location}: </h2>
          <div className="cards-wrapper">
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
