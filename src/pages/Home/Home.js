import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../fb-config";
import { UserAuth } from "../../context/AuthContext";
import elephant from "../../assets/images/elephant.svg";
import earth from "../../assets/images/earth.png";
import "./Home.scss";
import { useEffect } from "react";

const Home = () => {
  const { user } = UserAuth();

  const processNewUser = async (id) => {
    const userDetails = {
      email: user.email,
      name: user.displayName,
      points: 0,
      totalPoints: 0,
      transactions: [],
      initiatves: [],
      joined: Date.now(),
      establishmentId: false,
    };
    const userDocRef = doc(db, "users", id);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.data()) {
      return;
    }
    await setDoc(doc(db, "users", id), userDetails);
  };

  useEffect(() => {
    if (user) {
      processNewUser(user.uid);
    }
  }, []);

  return (
    <>
      <div className="home">
        <div className="home__left">
          <h1 className="home__header">umi: Earth's Loyalty Card App</h1>
          <p className="home__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
          {!user && (
            <Link className="home__button" to="/login">
              GET STARTED
            </Link>
          )}
        </div>
        <div className="home__right">
          <img className="home__elephant" src={elephant} alt="elephant" />
        </div>
      </div>
      <section className="about">
        <div className="about__left">
          <h1 className="about__header">Earn umi Points</h1>
          <p className="about__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
        </div>
      </section>
      <section className="initiatives">
        <div className="about__left">
          <h1 className="about__header">Earn umi Points</h1>
          <p className="about__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            repellendus obcaecati, autem praesentium culpa doloribus.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
