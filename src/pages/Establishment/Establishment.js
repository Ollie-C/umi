import "./Establishment.scss";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//icons
import organic from "../../assets/icons/organic.png";
import local from "../../assets/icons/place.png";
import plantBased from "../../assets/icons/vegan.png";
import cafe from "../../assets/images/origin.PNG";

const Establishment = () => {
  const { establishmentId } = useParams();
  const [currentEstablishment, setCurrentEstablishment] = useState([]);
  const [rewardAccess, setRewardAccess] = useState(true);
  const establishmentDocRef = doc(db, "establishments", establishmentId);

  const getCurrentEstablishment = async () => {
    try {
      if (auth) {
        const docSnap = await getDoc(establishmentDocRef);
        setCurrentEstablishment(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentEstablishment();
  }, []);

  if (!currentEstablishment) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="establishment">
      <div className="establishment__images-wrapper">
        <img
          src={currentEstablishment.image ? currentEstablishment.image : cafe}
          alt={`${currentEstablishment.name} cover image`}
          className="establishment__cover"
        />
      </div>
      <div className="establishment__details">
        <div className="establishment__title">
          <h2 className="establishment__name">{currentEstablishment.name}</h2>
          <p className="establishment__rating">
            {currentEstablishment.category}
          </p>
        </div>
        <div className="establishment__initiatives">
          <img
            className="establishment__icons"
            src={plantBased}
            alt="plant based icon"
          />
          <img
            className="establishment__icons"
            src={organic}
            alt="organic icon"
          />
          <img className="establishment__icons" src={local} alt="local icon" />
        </div>
        <div className="establishment__contact">
          <p className="establishment__description ">
            {currentEstablishment.address}, {currentEstablishment.postcode}
          </p>
        </div>
        <p className="establishment__description">
          {currentEstablishment.description
            ? currentEstablishment.description
            : "No details."}
        </p>

        {rewardAccess ? (
          <button className="establishment__button">
            <p className="establishment__points">Collect 20 umi</p>
          </button>
        ) : (
          <button className="establishment__button establishment__button--locked">
            [Locked] 20 umi
          </button>
        )}
      </div>
    </div>
  );
};

export default Establishment;
