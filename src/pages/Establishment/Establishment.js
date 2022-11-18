import "./Establishment.scss";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
//icons
import organic from "../../assets/icons/organic.png";
import local from "../../assets/icons/place.png";
import plantBased from "../../assets/icons/vegan.png";
import cafe from "../../assets/images/origin.PNG";

const Establishment = () => {
  const { user } = UserAuth();
  const { establishmentId } = useParams();

  const [currentEstablishment, setCurrentEstablishment] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [rewardAccess, setRewardAccess] = useState(false);

  const establishmentDocRef = doc(db, "establishments", establishmentId);
  const currentUserRef = doc(db, "users", String(user.uid));

  let newToken = uuidv4();

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

  const getCurrentUser = async () => {
    try {
      if (auth) {
        const docSnap = await getDoc(currentUserRef);
        if (docSnap.data()) {
          setCurrentUser(docSnap.data());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateToken = () => {
    if (
      currentUser.token === currentEstablishment.rewardId &&
      currentUser.token !== undefined
    ) {
      setRewardAccess(true);
      return true;
    }
    return false;
  };

  const collectPoints = async () => {
    const newTransactionRef = doc(
      collection(db, "users", String(user.uid), "transactions")
    );
    try {
      await updateDoc(establishmentDocRef, {
        rewardId: newToken,
        visitors: increment(1),
      });
      await setDoc(newTransactionRef, {
        date: Date.now(),
        location: currentEstablishment.name,
        points: 20,
      });
      await updateDoc(currentUserRef, {
        points: increment(20),
        totalPoints: increment(20),
      });
      setRewardAccess(false);
      alert("Successfully added points.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentEstablishment();
    getCurrentUser();
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      validateToken();
    }, 2000);
  }, [currentUser]);

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
          <button
            onClick={() => collectPoints()}
            className="establishment__button"
          >
            COLLECT 20 UMI
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
