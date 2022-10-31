import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db, auth } from "../../fb-config";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const usersCollectionRef = collection(db, "users");
  console.log(userData);

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUserData();
  });
  return <p>Welcome to your profile</p>;
};

export default Profile;
