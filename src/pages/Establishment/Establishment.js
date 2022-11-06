import "./Establishment.scss";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Vurger from "../../assets/images/vurger.PNG";

const Establishment = () => {
  const { establishmentId } = useParams();
  const [currentEstablishment, setCurrentEstablishment] = useState([]);
  const [rewardAccess, setRewardAccess] = useState(false);
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
          src={Vurger}
          alt="establishment-cover-image"
          className="establishment__cover"
        />
        <div className="establishment__gallery">
          <img src={Vurger} alt="" className="establishment__image" />
          <img src={Vurger} alt="" className="establishment__image" />
          <img src={Vurger} alt="" className="establishment__image" />
          <img src={Vurger} alt="" className="establishment__image" />
        </div>
      </div>
      <div className="establishment__title">
        <h2 className="establishment__name">{currentEstablishment.name}</h2>
        <p className="establishment__rating">{currentEstablishment.rating}</p>
      </div>
      <button onClick={() => setRewardAccess(true)}>Check in</button>
      <p className="establishment__description">
        {currentEstablishment.description}
      </p>
      <div className="establishment__contact">
        <h2 className="establishment__header">Address:</h2>
        <p className="establishment__description ">
          56 Road Avenue, London NW8 7BT
        </p>
      </div>
      <div className="establishment__initiatives">
        <h2 className="initiatives__title">Sustainable Initiatives:</h2>
        <article className="initiatives__card">
          <h3 className="initiatives__name">PLANT-BASED</h3>
        </article>
        <article className="initiatives__card">
          <h3 className="initiatives__name">ZERO-WASTE</h3>
        </article>
        <article className="initiatives__card">
          <h3 className="initiatives__name">ZERO-WASTE</h3>
        </article>
      </div>

      {rewardAccess ? (
        <button className="establishment__button">
          <p className="establishment__points">Collect 20 points</p>
        </button>
      ) : (
        <button className="establishment__button establishment__button--locked">
          [Locked] 20 points
        </button>
      )}
    </div>
  );
};

export default Establishment;
