import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../fb-config";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import UserTransaction from "../../components/UserTransaction/UserTransaction";
//icons
import coin from "../../assets/images/unnamed.png";
import { Icon } from "@iconify/react";
import zeroWaste from "../../assets/icons/zeroWaste.png";
import local from "../../assets/icons/place.png";
import plantBased from "../../assets/icons/vegan.png";

const Profile = () => {
  const navigate = useNavigate();
  const { logOut, user } = UserAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userEstablishment, setUserEstablishment] = useState("");

  const getDate = (date) => new Date(date).toLocaleDateString("en-GB");
  console.log(user.uid);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const userDocRef = doc(db, "users", String(user.uid));
  const establishmentsRef = collection(db, "establishments");
  const transactionsRef = collection(
    db,
    "users",
    String(user.uid),
    "transactions"
  );

  const getTransactions = async () => {
    try {
      const data = await getDocs(transactionsRef);
      const transactionsData = data.docs.map((transaction) => ({
        ...transaction.data(),
        id: transaction.id,
      }));
      setTransactions(transactionsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getEstablishment = async () => {
    try {
      const establishmentQuery = query(
        establishmentsRef,
        where("ownerId", "==", String(user.uid))
      );
      const querySnapshot = await getDocs(establishmentQuery);
      console.log(querySnapshot);
      const establishmentData = querySnapshot.docs.map((establishment) => ({
        ...establishment.data(),
        id: establishment.id,
      }));
      setUserEstablishment(establishmentData);
      console.log(userEstablishment);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.data()) {
        setCurrentUser(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User data not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getTransactions();
    getEstablishment();
  }, [user]);

  if (!user) {
    return (
      <div className="profile-wrapper">
        <h1>Please log in ...</h1>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-wrapper">
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div className="profile-wrapper">
      <section className="profile">
        <h1 className="profile__name">{currentUser.name}</h1>

        {userEstablishment.length == 0 ? (
          <button onClick={() => navigate("/add")} className="profile__connect">
            Connect Your Organisation
          </button>
        ) : (
          <>
            <p className="profile__owner">{userEstablishment[0].name} Owner</p>
            <button
              onClick={() => navigate(`/dashboard/${userEstablishment[0].id}`)}
              className="profile__dashboard"
            >
              Go to Dashboard
            </button>
          </>
        )}
        <div className="profile__details">
          <div className="detail__wrapper">
            <label htmlFor="" className="profile__label">
              email:
            </label>
            <p className="profile__detail"> {currentUser.email}</p>
          </div>
          <div className="detail__wrapper">
            <label htmlFor="" className="profile__label">
              user since:
            </label>
            <p className="profile__detail"> {getDate(currentUser.joined)}</p>
          </div>
        </div>
        <div className="profile__initiatives">
          <h2 className="profile__header">Initiatives you follow:</h2>
          <div className="icon-wrapper">
            <img className="initiative-icon" src={zeroWaste} alt="" />
            <img className="initiative-icon" src={plantBased} alt="" />
            <img className="initiative-icon" src={local} alt="" />
          </div>
        </div>
        <button onClick={handleLogOut} className="logout">
          LOGOUT
        </button>
      </section>
      <section className="stats">
        <h2 className="profile__header">POINTS</h2>
        <div className="points">
          <div className="points__left">
            <img src={coin} alt="umi-points-icon" />
          </div>
          <div className="points__right">
            <h3>Your points balance:</h3>
            <h2 className="points__balance">{currentUser.points} umi</h2>
            <p className="points__total">
              Total points: {currentUser.totalPoints}
            </p>
            <button
              onClick={() => navigate("/exchange")}
              className="profile__exchange"
            >
              Use points
            </button>
          </div>
        </div>
        <div className="activity">
          <h2 className="profile__header">ACTIVITY</h2>
          <div className="activity__container">
            {transactions.length > 0 ? (
              transactions.map((transaction) => {
                return (
                  <UserTransaction
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              })
            ) : (
              <p className="profile__noactivity">No recorded activity.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
