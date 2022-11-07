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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const Collect = () => {
  const { id, token } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();
  let newToken = uuidv4();

  const currentUser = doc(db, "users", String(user.uid));
  const testBusiness = doc(db, "establishments", id);
  const newTransactionRef = doc(
    collection(db, "users", String(user.uid), "transactions")
  );

  const validateToken = async () => {
    try {
      const docSnap = await getDoc(testBusiness);
      const currentRewardId = docSnap.data().rewardId;
      console.log(currentRewardId);
    } catch (error) {
      console.log(error);
    }
  };

  const collectPoints = async () => {
    try {
      await setDoc(newTransactionRef, {
        date: Date.now(),
        location: "Origin Coffee",
        points: 20,
      });
      await updateDoc(currentUser, {
        points: increment(20),
        totalPoints: increment(20),
      });
      navigate("/profile");
      await updateDoc(testBusiness, {
        rewardId: newToken,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  if (!user) {
    return <p>You are not logged in</p>;
  }

  console.log(token);
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
