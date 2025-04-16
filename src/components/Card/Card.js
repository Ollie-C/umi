import './Card.scss';
import OriginCoffee from '../../assets/images/origin.PNG';
import { Icon } from '@iconify/react';
import coin from '../../assets/images/unnamed.png';
import { useNavigate } from 'react-router-dom';

const Card = ({ result }) => {
  const navigate = useNavigate();

  // Extract initiatives that are true from result
  const activeInitiatives = result?.initiatives
    ? Object.entries(result.initiatives)
        .filter(([_, value]) => value === true)
        .map(([key]) => key.toUpperCase())
        .join(' | ')
    : '';

  return (
    <div className='card' onClick={() => navigate(`/${result.id}`)}>
      <div className='card__badge'>20 UMI</div>
      <div
        className='card__image'
        style={{
          backgroundImage: `url(${result.image ? result.image : OriginCoffee})`,
        }}>
        <div className='card__overlay'></div>
      </div>

      <div className='card__contents'>
        <div className='card__header'>
          <h2 className='card__title'>{result.name || 'No name'}</h2>
          <span className='card__category'>{result.category || 'Other'}</span>
        </div>

        <div className='card__description'>
          {activeInitiatives ? (
            <p className='card__text'>{activeInitiatives}</p>
          ) : (
            <p className='card__text'>SUSTAINABLE BUSINESS</p>
          )}

          <div className='card__bottom'>
            <div className='card__bottom-section card__verified'>
              <Icon icon='lucide:verified' color='#14b8a6' height='20' />
              <p>VERIFIED</p>
            </div>
            <div className='card__bottom-section card__points'>
              <p>20</p>
              <img className='card__coin' src={coin} alt='coin icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
