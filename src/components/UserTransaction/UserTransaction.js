import { Timestamp } from "firebase/firestore";

const UserTransaction = ({ transaction }) => {
  const date = Date(transaction.date);
  if (!transaction) {
    return <p> Loading</p>;
  }
  return (
    <div className="profile__transaction">
      <p className="transaction__text">
        {transaction.points} points earned at {transaction.location} on
        {date}
      </p>
    </div>
  );
};

export default UserTransaction;
