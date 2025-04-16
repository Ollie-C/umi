import './Establishment.scss';
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  setDoc,
} from 'firebase/firestore';
import { db, auth } from '../../fb-config';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';

// Icons
import organic from '../../assets/icons/organic.png';
import local from '../../assets/icons/place.png';
import plantBased from '../../assets/icons/vegan.png';
import cafe from '../../assets/images/origin.PNG';

const Establishment = () => {
  const { user, loading } = UserAuth();
  const { establishmentId } = useParams();

  const [currentEstablishment, setCurrentEstablishment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [rewardAccess, setRewardAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const establishmentDocRef = establishmentId
    ? doc(db, 'establishments', establishmentId)
    : null;
  const currentUserRef =
    user && user.uid ? doc(db, 'users', String(user.uid)) : null;

  let newToken = uuidv4();

  const getCurrentEstablishment = async () => {
    try {
      if (auth && establishmentId && establishmentDocRef) {
        const docSnap = await getDoc(establishmentDocRef);
        if (docSnap.exists()) {
          setCurrentEstablishment(docSnap.data());
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      if (auth && currentUserRef && user && user.uid) {
        const docSnap = await getDoc(currentUserRef);
        if (docSnap.exists() && docSnap.data()) {
          setCurrentUser(docSnap.data());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateToken = () => {
    if (
      currentUser &&
      currentEstablishment &&
      currentUser.token === currentEstablishment.rewardId &&
      currentUser.token !== undefined
    ) {
      setRewardAccess(true);
      return true;
    }
    return false;
  };

  const collectPoints = async () => {
    if (!user?.uid) {
      console.log('User ID is undefined');
      return;
    }

    const newTransactionRef = doc(
      collection(db, 'users', String(user.uid), 'transactions')
    );
    try {
      await updateDoc(establishmentDocRef, {
        rewardId: newToken,
        visitors: increment(1),
      });
      await setDoc(newTransactionRef, {
        date: Date.now(),
        location: currentEstablishment.name,
        points: 20,
      });
      await updateDoc(currentUserRef, {
        points: increment(20),
        totalPoints: increment(20),
      });
      setRewardAccess(false);
      alert('Successfully added points.');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.uid && !loading) {
      getCurrentEstablishment();
      getCurrentUser();
    } else if (!loading) {
      getCurrentEstablishment();
    }
  }, [user, loading]);

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      setTimeout(() => {
        validateToken();
      }, 2000);
    }
  }, [currentUser]);

  if (isLoading) {
    return <div className='loading-spinner'></div>;
  }

  if (!currentEstablishment) {
    return (
      <div className='establishment'>
        <div className='establishment__error'>
          <h2>Establishment Not Found</h2>
          <p>The establishment you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const initiativesList = [
    { name: 'Plant Based', icon: plantBased, alt: 'Plant based icon' },
    { name: 'Organic', icon: organic, alt: 'Organic icon' },
    { name: 'Local Produce', icon: local, alt: 'Local produce icon' },
  ];

  return (
    <div className='establishment'>
      <div className='establishment__container'>
        <div className='establishment__images-wrapper'>
          <img
            src={currentEstablishment.image ? currentEstablishment.image : cafe}
            alt={`${currentEstablishment.name} cover image`}
            className='establishment__cover'
          />
        </div>
        <div className='establishment__details'>
          <div className='establishment__title'>
            <h2 className='establishment__name'>{currentEstablishment.name}</h2>
            <p className='establishment__rating'>
              {currentEstablishment.category}
            </p>
          </div>

          <h3 className='establishment__initiatives-title'>
            Sustainability Initiatives
          </h3>
          <div className='establishment__initiatives'>
            {initiativesList.map((initiative, index) => (
              <div key={index} className='establishment__icon-wrapper'>
                <img
                  className='establishment__icons'
                  src={initiative.icon}
                  alt={initiative.alt}
                />
              </div>
            ))}
          </div>

          <div className='establishment__contact'>
            <p className='establishment__address'>
              {currentEstablishment.address}, {currentEstablishment.postcode}
            </p>
          </div>

          <div className='establishment__description'>
            {currentEstablishment.description
              ? currentEstablishment.description
              : 'No details available for this establishment.'}
          </div>

          {rewardAccess ? (
            <button
              onClick={() => collectPoints()}
              className='establishment__button'>
              <Icon icon='lucide:coin' className='establishment__button-icon' />
              COLLECT 20 UMI
            </button>
          ) : (
            <button className='establishment__button establishment__button--locked'>
              <Icon icon='lucide:lock' className='establishment__button-icon' />
              Points Locked
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Establishment;
