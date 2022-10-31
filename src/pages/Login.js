import { auth, provider } from "../fb-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      <button onClick={googleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
