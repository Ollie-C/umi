import { Icon } from "@iconify/react";
import "./UserTransaction.scss";

const UserTransaction = ({ transaction }) => {
  const date = new Date(transaction.date).toLocaleString("en-GB");

  if (!transaction) {
    return <p> Loading</p>;
  }
  return (
    <div className="activity__wrapper">
      <Icon
        className="activity__icon"
        icon="bi:arrow-right-circle-fill"
        height="20"
      />
      <p className="activity__text">
        {String(date)}: {transaction.points} points earned at{" "}
        {transaction.location}
      </p>
    </div>
  );
};

export default UserTransaction;
