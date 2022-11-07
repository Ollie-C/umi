import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useEffect, useState } from "react";
import React from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import UserTransaction from "../../components/UserTransaction/UserTransaction";

const Profile = () => {
  const navigate = useNavigate();
  const { logOut, user } = UserAuth();
  const [currentUser, setCurrentUser] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userEstablishment, setUserEstablishment] = useState("");

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
      console.log(transactions);
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
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap) {
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
    return <h1>Please log in ...</h1>;
  }

  if (!currentUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile">
      <h1 className="profile__header">
        Welcome to your profile, {currentUser.name}
      </h1>
      <div className="profile__buttons">
        <p className="profile__email">{currentUser.email}</p>
        <div className="profile__organisation">
          {!userEstablishment ? (
            <button
              onClick={() => navigate("/add")}
              className="profile__addorganisation"
            >
              + Connect
            </button>
          ) : (
            <>
              <p className="profile__email">
                {userEstablishment[0].name} Owner
              </p>
              <button
                onClick={() =>
                  navigate(`/dashboard/${userEstablishment[0].id}`)
                }
                className="profile__addorganisation"
              >
                Go to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
      <button onClick={handleLogOut}>Log out</button>
      <h2 className="profile__subheader">Balance</h2>

      <div className="profile__balance">
        <h2 className="profile__points">{currentUser.points}</h2>
      </div>
      <h2 className="profile__subheader">Contributions</h2>
      <div className="profile__contributions">
        <div className="totals-wrapper">
          <div className="profile__total">
            <p>Total points:</p>
            <h2 className="profile__totals">{currentUser.totalPoints}</h2>
          </div>
          <div className="profile__total profile__total--second">
            <p>Fav Initiative:</p>
            <h2 className="profile__totals">Zero-waste</h2>
          </div>
        </div>
        <div className="profile__transactions">
          <h2>Recent transactions:</h2>
          {transactions ? (
            transactions.map((transaction) => {
              return (
                <UserTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              );
            })
          ) : (
            <p>No transactions recorded.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
