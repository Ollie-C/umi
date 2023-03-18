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
      const establishmentData = querySnapshot.docs.map((establishment) => ({
        ...establishment.data(),
        id: establishment.id,
      }));
      setUserEstablishment(establishmentData);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.data()) {
        setCurrentUser(docSnap.data());
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
        {userEstablishment.length === 0 ? (
          <button onClick={() => navigate("/add")} className="profile__button">
            Connect Your Organisation
          </button>
        ) : (
          <>
            <p className="profile__owner">{userEstablishment[0].name} Owner</p>
            <button
              onClick={() => navigate(`/dashboard/${userEstablishment[0].id}`)}
              className="profile__button"
            >
              Go to Dashboard
            </button>
          </>
        )}
        <div className="profile__details">
          <p className="profile__detail">
            email: <b>{currentUser.email}</b>
          </p>
          <p className="profile__detail">
            user since: <b>{getDate(currentUser.joined)}</b>
          </p>
        </div>
        <div className="profile__initiatives">
          <h2 className="profile__header">Initiatives you follow:</h2>
          <div className="profile__icons-wrapper">
            <img
              className="profile__icon"
              src={zeroWaste}
              alt="zerowaste icon"
            />
            <img
              className="profile__icon"
              src={plantBased}
              alt="plant based icon"
            />
            <img className="profile__icon" src={local} alt="local icon" />
          </div>
        </div>
      </section>

      <section className="stats">
        <h2 className="profile__header">Your Points:</h2>
        <div className="points">
          <div className="points__section">
            <h3>Current balance:</h3>
            {currentUser.totalPoints ? (
              <>
                <h2 className="points__balance">{currentUser.points}</h2>
                <p className="points__total">
                  Total points: {currentUser.totalPoints}
                </p>
              </>
            ) : (
              <p>No points yet!</p>
            )}
          </div>
          <div className="points__section">
            <img src={coin} alt="umi-points-icon" />
          </div>
          <button
            onClick={() => navigate("/exchange")}
            className="profile__button"
          >
            Use points
          </button>
        </div>
        <div className="activity">
          <h2 className="profile__header">Your Contributions:</h2>
          <div className="activity__container">
            {transactions.length > 0 ? (
              transactions
                .map((transaction) => {
                  return (
                    <UserTransaction
                      key={transaction.id}
                      transaction={transaction}
                    />
                  );
                })
                .slice(0, 5)
            ) : (
              <p className="profile__noactivity">No recorded activity.</p>
            )}
          </div>
        </div>
      </section>
      <button onClick={handleLogOut} className="logout">
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
