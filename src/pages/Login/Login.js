import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import logo from "../../assets/images/umi_logo-black.png";

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
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login__card">
        <h1 className="login__header">Welcome to</h1>
        <img className="login__logo" src={logo} alt="umi logo" />
        <button className="login__google" onClick={handleLogIn}>
          LOG IN WITH GOOGLE
        </button>
        <p className="login__noaccount">
          Don't have a Google account? Log in with email and password.
        </p>
      </div>
    </div>
  );
};

export default Login;
