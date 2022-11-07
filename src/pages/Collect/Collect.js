import "./Collect.scss";
import { UserAuth } from "../../context/AuthContext";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  collection,
  getDoc,
} from "firebase/firestore";
import { db } from "../../fb-config";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

const Collect = () => {
  const { id, token } = useParams();
  const { user } = UserAuth();
  const [currentEstablishment, setCurrentEstablishment] = useState();

  const navigate = useNavigate();
  let newToken = uuidv4();

  const currentUser = doc(db, "users", String(user.uid));
  const currentEstablishmentRef = doc(db, "establishments", id);
  const newTransactionRef = doc(
    collection(db, "users", String(user.uid), "transactions")
  );

  const getEstablishment = async () => {
    try {
      const docSnap = await getDoc(currentEstablishmentRef);
      const establishmentData = docSnap.data();
      setCurrentEstablishment(establishmentData);
    } catch (error) {
      console.log(error);
    }
  };

  const validateToken = async () => {
    try {
      const docSnap = await getDoc(currentEstablishmentRef);
      const currentRewardId = docSnap.data().rewardId;
    } catch (error) {
      console.log(error);
    }
  };

  const collectPoints = async () => {
    try {
      await setDoc(newTransactionRef, {
        date: Date.now(),
        location: currentEstablishment.name,
        points: 20,
      });
      await updateDoc(currentUser, {
        points: increment(20),
        totalPoints: increment(20),
      });
      navigate("/profile");
      await updateDoc(currentEstablishmentRef, {
        rewardId: newToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEstablishment();
  }, []);

  useEffect(() => {
    validateToken();
  }, []);

  if (!user) {
    return <p>You are not logged in</p>;
  }

  return (
    <div className="collect">
      <p>Token: {token} </p>
      <button className="collect__button" onClick={collectPoints}>
        COLLECT 20 POINTS
      </button>
    </div>
  );
};

export default Collect;
