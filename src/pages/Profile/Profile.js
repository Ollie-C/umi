import {
  doc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../fb-config';
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';
import UserTransaction from '../../components/UserTransaction/UserTransaction';
//icons
import coin from '../../assets/images/unnamed.png';
import zeroWaste from '../../assets/icons/zeroWaste.png';
import local from '../../assets/icons/place.png';
import plantBased from '../../assets/icons/vegan.png';
import { Icon } from '@iconify/react';

const Profile = () => {
  const navigate = useNavigate();
  const { logOut, user, loading } = UserAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [userEstablishment, setUserEstablishment] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDate = (date) => new Date(date).toLocaleDateString('en-GB');

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      const transactionsRef = collection(db, 'users', user.uid, 'transactions');
      const data = await getDocs(transactionsRef);
      const transactionsData = data.docs.map((transaction) => ({
        ...transaction.data(),
        id: transaction.id,
      }));
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getEstablishment = async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      const establishmentsRef = collection(db, 'establishments');
      const establishmentQuery = query(
        establishmentsRef,
        where('ownerId', '==', user.uid)
      );
      const querySnapshot = await getDocs(establishmentQuery);
      const establishmentData = querySnapshot.docs.map((establishment) => ({
        ...establishment.data(),
        id: establishment.id,
      }));
      setUserEstablishment(establishmentData);
    } catch (error) {
      console.error('Error fetching establishment:', error);
      setError('Failed to load establishment data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    if (!user?.uid) return;

    try {
      setIsLoading(true);
      const userDocRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setCurrentUser(docSnap.data());
      } else {
        console.log('User data not found');
        setError('User profile not found. Please try logging in again.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      getCurrentUser();
      getTransactions();
      getEstablishment();
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className='profile-wrapper'>
        <div className='profile-loading'>
          <div className='loading-spinner'></div>
          <h2>Loading your profile...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='profile-wrapper'>
        <div className='profile-error'>
          <Icon icon='octicon:alert-24' width='48' height='48' />
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={handleLogOut}
            className='profile__button profile__button--secondary'>
            LOGOUT
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='profile-wrapper'>
        <div className='profile-message'>
          <h2>Please log in</h2>
          <button
            onClick={() => navigate('/login')}
            className='profile__button'>
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className='profile-wrapper'>
        <div className='profile-message'>
          <h2>User profile not found</h2>
          <button
            onClick={handleLogOut}
            className='profile__button profile__button--secondary'>
            LOGOUT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='profile-wrapper'>
      <div className='profile-container'>
        <section className='profile'>
          <div className='profile__user-info'>
            <div className='profile__avatar'>
              {currentUser.name
                ? currentUser.name.charAt(0).toUpperCase()
                : 'U'}
            </div>
            <div className='profile__details-container'>
              <h1 className='profile__name'>{currentUser.name}</h1>
              <div className='profile__details'>
                <p className='profile__detail'>
                  <Icon icon='mdi:email-outline' className='profile__icon' />
                  <span>{currentUser.email}</span>
                </p>
                <p className='profile__detail'>
                  <Icon icon='mdi:calendar' className='profile__icon' />
                  <span>Member since: {getDate(currentUser.joined)}</span>
                </p>
              </div>
            </div>
          </div>

          <div className='profile__action-card'>
            {userEstablishment.length === 0 ? (
              <div className='profile__connect'>
                <h3>Connect Your Business</h3>
                <p>Add your sustainable business to our network</p>
                <button
                  onClick={() => navigate('/add')}
                  className='profile__button'>
                  CONNECT BUSINESS
                </button>
              </div>
            ) : (
              <div className='profile__business'>
                <div className='profile__business-info'>
                  <h3>{userEstablishment[0].name}</h3>
                  <p className='profile__owner'>Business Owner</p>
                </div>
                <button
                  onClick={() =>
                    navigate(`/dashboard/${userEstablishment[0].id}`)
                  }
                  className='profile__button'>
                  GO TO DASHBOARD
                </button>
              </div>
            )}
          </div>

          <div className='profile__initiatives-card'>
            <h3 className='profile__header'>Sustainability Initiatives</h3>
            <div className='profile__icons-wrapper'>
              <div className='initiative-icon'>
                <img
                  className='profile__icon-img'
                  src={zeroWaste}
                  alt='zero waste icon'
                />
                <span>Zero Waste</span>
              </div>
              <div className='initiative-icon'>
                <img
                  className='profile__icon-img'
                  src={plantBased}
                  alt='plant based icon'
                />
                <span>Plant Based</span>
              </div>
              <div className='initiative-icon'>
                <img
                  className='profile__icon-img'
                  src={local}
                  alt='local icon'
                />
                <span>Local</span>
              </div>
            </div>
          </div>
        </section>

        <section className='stats'>
          <div className='points-card'>
            <h2 className='profile__header'>Your UMI Points</h2>
            <div className='points'>
              <div className='points__section'>
                <h3>Current balance</h3>
                <div className='points__balance'>
                  <span className='points__amount'>
                    {currentUser.points || 0}
                  </span>
                  <img
                    src={coin}
                    alt='umi-points-icon'
                    className='points__coin'
                  />
                </div>
                <p className='points__total'>
                  Total earned: {currentUser.totalPoints || 0}
                </p>
              </div>
              <button
                onClick={() => navigate('/exchange')}
                className='profile__button'>
                USE POINTS
              </button>
            </div>
          </div>

          <div className='activity-card'>
            <h2 className='profile__header'>Recent Contributions</h2>
            {transactions.length > 0 ? (
              <div className='activity__container'>
                {transactions
                  .map((transaction) => (
                    <UserTransaction
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))
                  .slice(0, 5)}
                {transactions.length > 5 && (
                  <button className='profile__button profile__button--text'>
                    VIEW ALL
                  </button>
                )}
              </div>
            ) : (
              <div className='activity__empty'>
                <Icon icon='mdi:leaf' width='48' height='48' />
                <p className='profile__noactivity'>No recorded activity yet.</p>
                <p className='profile__hint'>
                  Visit sustainable businesses to earn points!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <button
        onClick={handleLogOut}
        className='profile__button profile__button--secondary profile__logout'>
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
