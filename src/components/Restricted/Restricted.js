import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Restricted = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Restricted;
