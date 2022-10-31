import { auth, provider } from "../../fb-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    await signInWithPopup(auth, provider);
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    navigate("/");
  };
  return (
    <div className="login">
      <button className="login__google" onClick={googleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
