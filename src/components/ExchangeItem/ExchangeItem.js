import './ExchangeItem.scss';
import sapling from '../../assets/images/sapling.jpg';
import coin from '../../assets/images/unnamed.png';
import { Icon } from '@iconify/react';

const ExchangeItem = ({ item }) => {
  return (
    <div className='item'>
      <div className='item__image-container'>
        <img
          src={item.image ? item.image : sapling}
          alt='Exchange item'
          className='item__image'
        />
      </div>
      <div className='item__content'>
        <h2 className='item__title'>{item.name}</h2>
        <div className='item__description'>
          <p className='item__text'>
            {item.description || 'No description available.'}
          </p>
        </div>
        <div className='item__bottom'>
          <div className='item__stats'>
            <div className='item__points-container'>
              <img className='item__coin' src={coin} alt='coin icon' />
              <p className='item__points'>{item.cost}</p>
            </div>
          </div>
          <div className='item__availability'>
            <button className='item__button'>
              <Icon icon='lucide:shopping-bag' style={{ marginRight: '8px' }} />
              Redeem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeItem;
