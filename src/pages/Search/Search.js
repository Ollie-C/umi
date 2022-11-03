import "./Search.scss";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Map from "../../components/Map/Map";
import Card from "../../components/Card/Card";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../fb-config";

const Search = ({ searchedPlace }) => {
  const navigate = useNavigate();
  const { location } = useParams();
  const [coordinates, setCoordinates] = useState();
  const [results, setResults] = useState([]);
  const establishmentsCollectionRef = collection(db, "establishments");

  const { REACT_APP_GM_API_KEY } = process.env;

  const getEstablishments = async () => {
    try {
      if (auth) {
        const data = await getDocs(establishmentsCollectionRef);
        const establishmentData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setResults(establishmentData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCentre = async () => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedPlace}&key=${REACT_APP_GM_API_KEY}`
    );
    setCoordinates(data.results[0].geometry.location);
  };

  useEffect(() => {
    getEstablishments();
  }, []);

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
          <ul className="cards-wrapper">
            {results.map((result) => {
              return (
                <div
                  onClick={() => {
                    navigate(`/${result.id}`);
                  }}
                  className="card-wrapper"
                >
                  <Card key={result.id} result={result} />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
