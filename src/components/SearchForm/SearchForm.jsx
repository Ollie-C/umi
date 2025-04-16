import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchForm.scss';
import { Icon } from '@iconify/react';

const SearchForm = ({ handleSearchSubmit }) => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const mockCategories = ['All', 'Cafe', 'Restaurant', 'Groceries', 'Retail'];

  const changeHandler = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim()) {
      handleSearchSubmit(address);
      navigate(`search/${address}`);
    }
  };

  return (
    <form id='searchForm' className='searchForm' onSubmit={handleSubmit}>
      <div className='searchForm__container'>
        <h2 className='searchForm__title'>
          Find Sustainable Businesses Near You
        </h2>
        <div className='searchForm__fields'>
          <div className='searchForm__field-container'>
            <label htmlFor='location' className='searchForm__label'>
              Location
            </label>
            <input
              type='text'
              id='location'
              className='searchForm__input'
              placeholder='Enter city, address or postal code'
              name='search'
              value={address}
              onChange={changeHandler}
            />
          </div>
          <div className='searchForm__field-container'>
            <label htmlFor='category' className='searchForm__label'>
              Category
            </label>
            <select
              id='category'
              name='category'
              className='searchForm__select'>
              {mockCategories.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='searchForm__button-container'>
          <button type='submit' className='searchForm__button'>
            <Icon icon='lucide:search' />
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
