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
      console.log("here", user);

      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__header">Welcome to umi.</h1>
        <p className="login__text">Let's get started.</p>
        <button className="login__google" onClick={handleLogIn}>
          Log in with Google
        </button>
        <p className="login__noaccount">
          Don't have a Google account? Log in with email and password.
        </p>
      </div>
    </div>
  );
};

export default Login;
