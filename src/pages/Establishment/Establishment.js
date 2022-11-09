import "./Establishment.scss";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//icons
import zeroWaste from "../../assets/icons/zeroWaste.png";
import ecoEnergy from "../../assets/icons/eco-light.png";
import organic from "../../assets/icons/organic.png";
import local from "../../assets/icons/place.png";
import reuse from "../../assets/icons/reuse.png";
import plantBased from "../../assets/icons/vegan.png";
import handMade from "../../assets/icons/hand-made.png";

import cafe from "../../assets/images/coffee-shop.jpg";

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
          src={cafe}
          alt="establishment-cover-image"
          className="establishment__cover"
        />
      </div>
      <div className="establishment__details">
        <div className="establishment__title">
          <h2 className="establishment__name">{currentEstablishment.name}</h2>
          <p className="establishment__rating">{currentEstablishment.rating}</p>
        </div>
        <div className="establishment__initiatives">
          <img className="establishment__icons" src={plantBased} alt="" />
          <img className="establishment__icons" src={organic} alt="" />
          <img className="establishment__icons" src={local} alt="" />
        </div>
        <p className="establishment__description">
          {currentEstablishment.description}
        </p>
        <div className="establishment__contact">
          <p className="establishment__description ">
            56 Road Avenue, London NW8 7BT
          </p>
        </div>

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
