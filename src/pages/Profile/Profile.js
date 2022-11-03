import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useState } from "react";
import { useEffect } from "react";
import "./Profile.scss";

const Profile = ({ isLoggedIn }) => {
  const [user, setUser] = useState([]);

  const userDocRef = doc(db, "users", "1P3YQMeCkWNKoQdMKrwI");

  const getCurrentUser = async () => {
    try {
      if (auth) {
        const docSnap = await getDoc(userDocRef);
        setUser(docSnap.data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (!isLoggedIn) {
    return <h1>Please log in ...</h1>;
  }

  return (
    <div className="profile">
      <h1 className="profile__header">
        Welcome to your profile, {user.username}
      </h1>
      <p className="profile__email">{user.email}</p>
      <h2 className="profile__subheader">Balance</h2>
      <div className="profile__balance">
        <h2 className="profile__points">290</h2>
      </div>
      <h2 className="profile__subheader">Contributions</h2>
      <div className="profile__contributions">
        <div className="totals-wrapper">
          <div className="profile__total">
            <p>Total points:</p>
            <h2 className="profile__totals">1030</h2>
          </div>
          <div className="profile__total profile__total--second">
            <p>Fav Initiative:</p>
            <h2 className="profile__totals">Zero-waste</h2>
          </div>
        </div>
        <div className="profile__transactions">
          <div className="profile__transaction">
            <p className="transaction__text">20 points earned at</p>
            <p className="transaction__shop">Origin Coffee</p>
          </div>
          <div className="profile__transaction">
            <p className="transaction__text">20 points earned at</p>
            <p className="transaction__shop">Origin Coffee</p>
          </div>
          <div className="profile__transaction">
            <p className="transaction__text">20 points earned at</p>
            <p className="transaction__shop">Origin Coffee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
