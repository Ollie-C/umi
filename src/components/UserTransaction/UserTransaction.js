import { Icon } from '@iconify/react';
import './UserTransaction.scss';

const UserTransaction = ({ transaction }) => {
  if (!transaction) {
    return <p>Loading...</p>;
  }

  const date = new Date(transaction.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const time = new Date(transaction.date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='activity__wrapper'>
      <div className='activity__icon-container'>
        <Icon className='activity__icon' icon='lucide:coin' />
      </div>
      <div className='activity__content'>
        <p className='activity__text'>
          <span className='activity__points'>{transaction.points} points</span>{' '}
          earned at{' '}
          <span className='activity__location'>{transaction.location}</span>
        </p>
        <p className='activity__date'>
          {date} at {time}
        </p>
      </div>
    </div>
  );
};

export default UserTransaction;
