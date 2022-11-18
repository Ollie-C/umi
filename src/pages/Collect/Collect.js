import "./Collect.scss";
import { UserAuth } from "../../context/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

const Collect = () => {
  const { id, token } = useParams();
  const { user } = UserAuth();
  const navigate = useNavigate();

  const currentEstablishment = doc(db, "establishments", id);

  const validToken = async () => {
    try {
      const docSnap = await getDoc(currentEstablishment);
      const currentRewardId = docSnap.data().rewardId;
      if (currentRewardId !== token) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const collectPoints = async () => {
    const currentUser = doc(db, "users", String(user.uid));

    try {
      await updateDoc(currentUser, {
        token: token,
      });
      navigate(`/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      if (validToken) {
        return console.log("all good");
      }
      return console.log("not valid");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        collectPoints();
      }, 3000);
    }
  }, []);

  if (!user) {
    return <p>You are not logged in</p>;
  }

  return (
    <div className="collect">
      <h1>Hold tight. . .</h1>
    </div>
  );
};

export default Collect;
