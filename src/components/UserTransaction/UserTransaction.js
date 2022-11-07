const UserTransaction = ({ transaction }) => {
  const date = new Date(transaction.date).toLocaleString("en-GB");
  console.log(date);
  if (!transaction) {
    return <p> Loading</p>;
  }
  return (
    <div className="profile__transaction">
      <p className="transaction__text">
        {transaction.points} points earned at {transaction.location} on
        {String(date)}
      </p>
    </div>
  );
};

export default UserTransaction;
