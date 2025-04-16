import './Collect.scss';
import { UserAuth } from '../../context/AuthContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../fb-config';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

const Collect = () => {
  const { id, token } = useParams();
  const { user, loading } = UserAuth();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(false);

  const currentEstablishment = id ? doc(db, 'establishments', id) : null;

  const validToken = async () => {
    if (!currentEstablishment || !token) {
      console.log('Missing establishment ID or token');
      return false;
    }

    try {
      const docSnap = await getDoc(currentEstablishment);
      if (!docSnap.exists()) {
        console.log("Establishment document doesn't exist");
        return false;
      }

      const currentRewardId = docSnap.data()?.rewardId;
      if (currentRewardId !== token) {
        console.log("Token doesn't match current reward ID");
        return false;
      }

      setTokenValid(true);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const collectPoints = async () => {
    if (!user || !user.uid) {
      console.log('User not properly authenticated');
      return;
    }

    const currentUser = doc(db, 'users', String(user.uid));

    try {
      await updateDoc(currentUser, {
        token: token,
      });
      navigate(`/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.uid && !loading && id && token) {
      console.log('Collect - User loaded:', user.uid);
      validToken();
    }
  }, [user, loading, id, token]);

  useEffect(() => {
    if (user && user.uid && tokenValid) {
      setTimeout(() => {
        collectPoints();
      }, 3000);
    }
  }, [user, tokenValid]);

  if (!user) {
    return <p>You are not logged in</p>;
  }

  return (
    <div className='collect'>
      <h1>Hold tight. . .</h1>
    </div>
  );
};

export default Collect;
