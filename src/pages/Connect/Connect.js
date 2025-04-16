import { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../../fb-config';
import { Link, useNavigate } from 'react-router-dom';
import './Connect.scss';
import { v4 } from 'uuid';

const Connect = () => {
  const { user, loading } = UserAuth();
  const navigate = useNavigate();
  const storage = getStorage();
  const imageId = v4();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const [establishment, setEstablishment] = useState({
    name: '',
    ownerId: '',
    address: '',
    postcode: '',
    category: 'Cafe',
    description: '',
    initiatives: {
      handmade: false,
      local: false,
      organic: false,
      plantBased: false,
      renewableEnergy: false,
      reuse: false,
      zeroWaste: false,
    },
    imageId: imageId,
    createdAt: Date.now(),
    visitors: 0,
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user && !loading) {
      setEstablishment((prev) => ({
        ...prev,
        ownerId: user.uid,
      }));
    }
  }, [user, loading]);

  const validateForm = () => {
    const errors = {};
    if (!establishment.name.trim()) errors.name = 'Name is required';
    if (!establishment.address.trim()) errors.address = 'Address is required';
    if (!establishment.postcode.trim())
      errors.postcode = 'Postcode is required';

    if (establishment.description.trim().length > 100) {
      errors.description = 'Description must be 100 characters or less';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addEstablishment = async () => {
    try {
      setSubmitLoading(true);
      let imageUrl = null;

      if (image) {
        const imageRef = ref(storage, `images/${imageId}/${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const establishmentData = {
        ...establishment,
        image: imageUrl,
      };

      const newEstablishmentRef = doc(collection(db, 'establishments'));
      await setDoc(newEstablishmentRef, establishmentData);

      navigate('/profile');
    } catch (error) {
      console.error('Error adding establishment:', error);
      alert('Failed to add establishment. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstablishment({ ...establishment, [name]: value });

    // Clear error when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEstablishment({
      ...establishment,
      initiatives: {
        ...establishment.initiatives,
        [name]: checked,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addEstablishment();
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) element.focus();
    }
  };

  if (loading) {
    return <div className='connect'>Loading...</div>;
  }

  if (!user) {
    return (
      <div className='connect'>
        <p>Please log in to connect your establishment</p>
        <button onClick={() => navigate('/login')} className='connect__button'>
          LOG IN
        </button>
      </div>
    );
  }

  return (
    <div className='connect'>
      <h1 className='connect__header'>Connect Your Organization</h1>
      <p className='connect__subheader'>
        Join our network of sustainable businesses and reach eco-conscious
        customers.
      </p>

      <form id='connectform' className='connect__form' onSubmit={submitHandler}>
        <div className='form__left'>
          <div className='connect__fields'>
            <label htmlFor='name' className='connect__label'>
              Business Name*
            </label>
            <input
              type='text'
              className={`connect__input ${formErrors.name ? 'error' : ''}`}
              name='name'
              placeholder='Enter your business name'
              value={establishment.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <p className='error-message'>{formErrors.name}</p>
            )}
          </div>

          <div className='connect__fields'>
            <label className='connect__label'>Business Image</label>
            <div className='image-upload-container'>
              <input
                className='connect__addimage'
                type='file'
                accept='image/*'
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className='image-preview'>
                  <img src={imagePreview} alt='Preview' />
                </div>
              )}
            </div>
          </div>

          <div className='connect__fields'>
            <label htmlFor='address' className='connect__label'>
              Address*
            </label>
            <input
              type='text'
              className={`connect__input ${formErrors.address ? 'error' : ''}`}
              name='address'
              placeholder='Street address'
              value={establishment.address}
              onChange={handleChange}
            />
            {formErrors.address && (
              <p className='error-message'>{formErrors.address}</p>
            )}
          </div>

          <div className='connect__fields'>
            <label htmlFor='postcode' className='connect__label'>
              Postcode*
            </label>
            <input
              type='text'
              className={`connect__input ${formErrors.postcode ? 'error' : ''}`}
              name='postcode'
              placeholder='Postcode'
              value={establishment.postcode}
              onChange={handleChange}
            />
            {formErrors.postcode && (
              <p className='error-message'>{formErrors.postcode}</p>
            )}
          </div>

          <div className='connect__fields'>
            <label htmlFor='category' className='connect__label'>
              Business Category
            </label>
            <select
              name='category'
              className='connect__input'
              value={establishment.category}
              onChange={handleChange}>
              <option value='Cafe'>Cafe</option>
              <option value='Restaurant'>Restaurant</option>
              <option value='Groceries'>Groceries</option>
              <option value='Retail'>Retail</option>
              <option value='Services'>Services</option>
              <option value='Other'>Other</option>
            </select>
          </div>
        </div>

        <div className='form__right'>
          <div className='connect__fields'>
            <label htmlFor='description' className='connect__label'>
              Description
            </label>
            <textarea
              className={`connect__input connect__textarea ${
                formErrors.description ? 'error' : ''
              }`}
              name='description'
              placeholder='Describe your business (max 100 characters)'
              value={establishment.description}
              onChange={handleChange}></textarea>
            {formErrors.description && (
              <p className='error-message'>{formErrors.description}</p>
            )}
            <p className='char-count'>{establishment.description.length}/100</p>
          </div>

          <div className='connect__fields'>
            <p className='initiatives-title'>Sustainability Initiatives</p>
            <p className='initiatives-subtitle'>
              Select all that apply to your business
            </p>

            <div className='initiatives-grid'>
              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='zeroWaste'
                  name='zeroWaste'
                  checked={establishment.initiatives.zeroWaste}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='zeroWaste' className='initiative-label'>
                  Zero-waste
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='reuse'
                  name='reuse'
                  checked={establishment.initiatives.reuse}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='reuse' className='initiative-label'>
                  Reuse & Recycle
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='plantBased'
                  name='plantBased'
                  checked={establishment.initiatives.plantBased}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='plantBased' className='initiative-label'>
                  Plant-based
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='handmade'
                  name='handmade'
                  checked={establishment.initiatives.handmade}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='handmade' className='initiative-label'>
                  Handmade
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='organic'
                  name='organic'
                  checked={establishment.initiatives.organic}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='organic' className='initiative-label'>
                  Organic
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='local'
                  name='local'
                  checked={establishment.initiatives.local}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='local' className='initiative-label'>
                  Locally sourced
                </label>
              </div>

              <div className='initiative-item'>
                <input
                  type='checkbox'
                  id='renewableEnergy'
                  name='renewableEnergy'
                  checked={establishment.initiatives.renewableEnergy}
                  onChange={handleCheckboxChange}
                  className='connect__checkbox'
                />
                <label htmlFor='renewableEnergy' className='initiative-label'>
                  Renewable Energy
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className='connect__button-wrapper'>
        <button
          className='connect__button'
          form='connectform'
          disabled={submitLoading}>
          {submitLoading ? 'SUBMITTING...' : 'CONNECT BUSINESS'}
        </button>
        <Link className='connect__cancel' to='/profile'>
          CANCEL
        </Link>
      </div>
    </div>
  );
};

export default Connect;
