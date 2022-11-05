import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { logIn, user } = UserAuth();

  const handleLogIn = async () => {
    try {
      await logIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      console.log(user);
    }
  }, [user]);

  return (
    <div className="login">
      <h1 className="login__header">Create an account or sign in</h1>
      <button className="login__google" onClick={handleLogIn}>
        Log in with Google
      </button>
    </div>
  );
};

export default Login;
