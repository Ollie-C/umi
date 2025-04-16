import './EstablishmentDashboard.scss';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../fb-config';
import { UserAuth } from '../../context/AuthContext';
import { useParams, useNavigate, Link } from 'react-router-dom';

//ICONS
import { Icon } from '@iconify/react';
import zeroWaste from '../../assets/icons/zeroWaste.png';
import local from '../../assets/icons/place.png';
import handMade from '../../assets/icons/hand-made.png';

const EstablishmentDashboard = () => {
  const [currentEstablishment, setCurrentEstablishment] = useState({});
  const [qrcode, setQrcode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { user } = UserAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const baseURL = 'https://umi-lime.vercel.app';
  const token = uuidv4();
  let url = `${baseURL}/${id}/collect/${token}`;
  // let url = `/${id}/collect/${token}`; -> for testing purposes

  const establishmentRef = doc(db, 'establishments', id);

  const getEstablishment = async () => {
    try {
      setLoading(true);
      const docSnap = await getDoc(establishmentRef);
      if (!docSnap.exists()) {
        setError('Establishment not found');
        return;
      }
      const establishmentData = docSnap.data();
      setCurrentEstablishment(establishmentData);
    } catch (error) {
      console.error('Error fetching establishment:', error);
      setError('Failed to load establishment data');
    } finally {
      setLoading(false);
    }
  };

  const deleteEstablishment = async () => {
    try {
      await deleteDoc(establishmentRef);
      navigate('/profile');
    } catch (error) {
      console.error('Error deleting establishment:', error);
      setError('Failed to delete establishment');
    }
  };

  const generateQRCode = async () => {
    try {
      QRCode.toDataURL(url, (err, url) => {
        if (err) {
          console.error('Error generating QR code:', err);
          return;
        }
        setQrcode(url);
      });
      await updateDoc(establishmentRef, { rewardId: token });
    } catch (error) {
      console.error('Error updating reward ID:', error);
      setError('Failed to generate QR code');
    }
  };

  useEffect(() => {
    getEstablishment();
  }, [id]);

  if (loading) {
    return (
      <div className='dashboard'>
        <div className='dashboard__loading'>
          <div className='loading-spinner'></div>
          <h2>Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='dashboard'>
        <div className='dashboard__error'>
          <Icon icon='octicon:alert-24' width='48' height='48' />
          <h2>Error</h2>
          <p>{error}</p>
          <button
            onClick={() => navigate('/profile')}
            className='dashboard__button dashboard__button--secondary'>
            Return to Profile
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='dashboard'>
        <div className='dashboard__message'>
          <h2>Please log in to view this dashboard</h2>
          <button
            onClick={() => navigate('/login')}
            className='dashboard__button'>
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  if (user.uid !== currentEstablishment.ownerId) {
    return (
      <div className='dashboard'>
        <div className='dashboard__message'>
          <Icon icon='mdi:lock' width='48' height='48' />
          <h2>Access Restricted</h2>
          <p>You must be the owner to view this dashboard.</p>
          <button
            onClick={() => navigate('/')}
            className='dashboard__button dashboard__button--secondary'>
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='dashboard'>
      <div className='dashboard__header-container'>
        <h1 className='dashboard__header'>Business Dashboard</h1>
        <p className='dashboard__subheader'>{currentEstablishment.name}</p>
      </div>

      <div className='dashboard__card-wrapper'>
        <div className='dashboard__card dashboard__card--qr'>
          <div className='dashboard__card-header'>
            <h3>QR Code Generator</h3>
            <p>Generate a QR code for customers to scan</p>
          </div>
          <div className='dashboard__card-content'>
            {qrcode ? (
              <div className='dashboard__qr-container'>
                <img
                  className='dashboard__qrcode'
                  src={qrcode}
                  alt='establishment-qrcode'
                />
                <button
                  className='dashboard__button dashboard__button--icon'
                  onClick={generateQRCode}
                  aria-label='Regenerate QR code'>
                  <Icon icon='foundation:refresh' width='24' height='24' />
                  <span>Generate New</span>
                </button>
              </div>
            ) : (
              <div className='dashboard__qr-placeholder'>
                <p>
                  Create a QR code for your customers to scan and earn UMI
                  points
                </p>
                <button className='dashboard__button' onClick={generateQRCode}>
                  <Icon
                    icon='carbon:add-alt'
                    className='dashboard__button-icon'
                  />
                  Generate QR Code
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='dashboard__card dashboard__card--details'>
          <div className='dashboard__card-header'>
            <h3>Business Details</h3>
            <p>Manage your business information</p>
          </div>
          <div className='dashboard__card-content'>
            <div className='dashboard__detail-group'>
              <label className='dashboard__label'>BUSINESS NAME</label>
              <div className='dashboard__detail-wrapper'>
                <p className='dashboard__detail'>{currentEstablishment.name}</p>
                <button className='dashboard__edit-button'>
                  <Icon icon='ant-design:edit-filled' width='18' height='18' />
                </button>
              </div>
            </div>

            <div className='dashboard__detail-group'>
              <label className='dashboard__label'>ADDRESS</label>
              <div className='dashboard__detail-wrapper'>
                <p className='dashboard__detail'>
                  {currentEstablishment.address},{' '}
                  {currentEstablishment.postcode}
                </p>
                <button className='dashboard__edit-button'>
                  <Icon icon='ant-design:edit-filled' width='18' height='18' />
                </button>
              </div>
            </div>

            <div className='dashboard__detail-group'>
              <label className='dashboard__label'>VISITOR COUNT</label>
              <div className='dashboard__visitor-count'>
                <p className='dashboard__detail-large'>
                  {currentEstablishment.visitors || 0}
                </p>
                <p className='dashboard__detail-label'>Total Visitors</p>
              </div>
            </div>
          </div>
        </div>

        <div className='dashboard__card dashboard__card--initiatives'>
          <div className='dashboard__card-header'>
            <h3>Sustainability Initiatives</h3>
            <p>Your business's eco-friendly practices</p>
          </div>
          <div className='dashboard__card-content'>
            <div className='dashboard__initiatives-grid'>
              {Object.entries(currentEstablishment.initiatives || {})
                .filter(([_, value]) => value === true)
                .map(([key]) => (
                  <div key={key} className='dashboard__initiative'>
                    {key === 'local' && (
                      <img
                        src={local}
                        className='dashboard__initiative-icon'
                        alt='locally-sourced'
                      />
                    )}
                    {key === 'zeroWaste' && (
                      <img
                        src={zeroWaste}
                        className='dashboard__initiative-icon'
                        alt='zero-waste'
                      />
                    )}
                    {key === 'handmade' && (
                      <img
                        src={handMade}
                        className='dashboard__initiative-icon'
                        alt='hand-made'
                      />
                    )}
                    {key === 'plantBased' && (
                      <Icon
                        icon='mdi:sprout'
                        className='dashboard__initiative-icon-svg'
                      />
                    )}
                    {key === 'organic' && (
                      <Icon
                        icon='mdi:leaf'
                        className='dashboard__initiative-icon-svg'
                      />
                    )}
                    {key === 'renewableEnergy' && (
                      <Icon
                        icon='mdi:solar-power'
                        className='dashboard__initiative-icon-svg'
                      />
                    )}
                    {key === 'reuse' && (
                      <Icon
                        icon='mdi:recycle'
                        className='dashboard__initiative-icon-svg'
                      />
                    )}
                    <span className='dashboard__initiative-label'>
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .toLowerCase()
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </div>
                ))}
            </div>
            <button className='dashboard__button dashboard__button--outline'>
              <Icon icon='mdi:pencil' className='dashboard__button-icon' />
              Edit Initiatives
            </button>
          </div>
        </div>
      </div>

      {!showDeleteConfirm ? (
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className='dashboard__delete-button'>
          <Icon icon='mdi:delete-outline' className='dashboard__delete-icon' />
          Delete Business
        </button>
      ) : (
        <div className='dashboard__delete-confirm'>
          <p>
            Are you sure you want to delete this business? This action cannot be
            undone.
          </p>
          <div className='dashboard__delete-actions'>
            <button
              onClick={deleteEstablishment}
              className='dashboard__button dashboard__button--danger'>
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className='dashboard__button dashboard__button--secondary'>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EstablishmentDashboard;
