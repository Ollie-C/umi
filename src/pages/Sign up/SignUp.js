import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../fb-config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";

const SignUp = ({ isLoggedIn }) => {
  const [isOrganisation, setIsOrganisation] = useState(false);
  const [newUser, setNewUser] = useState();
  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  const createUser = async () => {
    const accountType = isOrganisation ? "organisation" : "personal";
    await addDoc(usersRef, {
      email: newUser.email,
      username: newUser.username,
      account_type: accountType,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createUser();
    navigate("/login");
  };

  return (
    <div className="signup">
      {!isLoggedIn ? (
        <>
          <h1 className="signup__header">Sign Up</h1>
          <form
            id="signupform"
            className="signup__form"
            onSubmit={submitHandler}
          >
            <div className="signup__fields">
              <label htmlFor="email" className="signup__label">
                EMAIL:
              </label>
              <input
                type="text"
                className="signup__input"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="signup__fields">
              <label htmlFor="username" className="signup__label">
                USERNAME:
              </label>
              <input
                type="text"
                className="signup__input"
                name="username"
                placeholder="Pick a username"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="signup__fields">
              <label htmlFor="password" className="signup__label">
                PASSWORD:
              </label>
              <input
                type="password"
                className="signup__input"
                name="password"
                placeholder="Enter a password between 3 - 16 characters long"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="signup__fields">
              <label htmlFor="confirmpassword" className="signup__label">
                CONFIRM PASSWORD:
              </label>
              <input
                type="password"
                className="signup__input"
                name="confirmpassword"
                placeholder="Confirm your password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="signup__radiofield">
              <p className="signup__label">
                What kind of account do you want to make?
              </p>
              <input
                type="radio"
                className="signup__radio"
                name="type"
                value="personal"
              />
              <label htmlFor="personal" className="signup__label">
                PERSONAL
              </label>
              {/* <input
                type="radio"
                className="signup__radio"
                name="organisation"
                value="organisation"
              />
              <label htmlFor="organisation" className="signup__label">
                ORGANISATION
              </label> */}
            </div>
            <div className="signup__button-wrapper">
              <button className="signup__button" form="signupform">
                SUBMIT
              </button>
              <Link className="signup__cancel" to="/">
                CANCEL
              </Link>
            </div>
          </form>
        </>
      ) : (
        <p className="signup__error">You already have an account.</p>
      )}
    </div>
  );
};

export default SignUp;
