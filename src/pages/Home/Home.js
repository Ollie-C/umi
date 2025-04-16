//Styles
import './Home.scss';
//Context
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../fb-config';
import { UserAuth } from '../../context/AuthContext';
//Images
import loyaltycard from '../../assets/images/loyaltycard_new.png';
import umiPhone from '../../assets/images/umi_top.png';
//Hooks
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Initiatives from '../../components/Initiatives/Initiatives';
import SearchForm from '../../components/SearchForm/SearchForm';

const Home = ({ handleSearchSubmit }) => {
  const { user, loading } = UserAuth();

  const navigate = useNavigate();

  const processNewUser = async (id) => {
    try {
      if (!id) {
        console.log('User ID is undefined');
        return;
      }

      //Check database if user already exists
      const userDocRef = doc(db, 'users', id);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists() && docSnap.data()) {
        return;
      }

      //Create new user if not
      const userDetails = {
        email: user?.email || '',
        name: user?.displayName || '',
        points: 0,
        totalPoints: 0,
        transactions: [],
        initiatves: [],
        joined: Date.now(),
        establishmentId: false,
      };
      await setDoc(doc(db, 'users', id), userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.uid && !loading) {
      console.log('Processing user with ID:', user.uid);
      processNewUser(user.uid);
    }
  }, [user, loading]);

  return (
    <div className='homepage'>
      <div className='background'></div>
      <section className='top'>
        {user && (
          <p className='top__text'>
            The ocean is in your hands
            {user.displayName &&
              ', ' + user.displayName.toUpperCase().split(' ')[0]}
          </p>
        )}
        <h2 className='top__header'>EARTH'S LOYALTY CARD APP</h2>

        {!user ? (
          <button onClick={() => navigate('/login')} className='top__cta'>
            Get Started
          </button>
        ) : (
          <SearchForm handleSearchSubmit={handleSearchSubmit} />
        )}
        <div className='top__image-wrapper'>
          <img
            className='top__loyaltyCard'
            src={loyaltycard}
            alt='umi loyalty card'
          />
        </div>
      </section>

      <Initiatives />
      <div className='download'>
        <button className='download__cta'>Download the app</button>
        <img className='download__image' src={umiPhone} alt='umi phone app' />
      </div>
    </div>
  );
};

export default Home;
