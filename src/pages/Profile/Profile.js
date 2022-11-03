import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useState } from "react";
import { useEffect } from "react";
import "./Profile.scss";

const Profile = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState(null);

  const usersCollectionRef = collection(db, "users");

  const getUserData = async () => {
    try {
      if (auth) {
        const data = await getDocs(usersCollectionRef);

        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const snapshot = await getDoc(doc(db, "users", user.uid))
  //       console.log(snapshot.data())
  //     }
  //   });
  // }, []);

  useEffect(() => {
    getUserData();
    console.log(userData);
  });

  if (!isLoggedIn) {
    return <h1>Please log in ...</h1>;
  }

  return (
    <div className="profile">
      <h1 className="profile__header">Welcome to your profile</h1>
    </div>
  );
};

export default Profile;
