import { Link } from "react-router-dom";
import "./SignUp.scss";

const SignUp = ({ isLoggedIn }) => {
  return (
    <div className="signup">
      {!isLoggedIn ? (
        <>
          <h1 className="signup__header">Sign Up</h1>
          <form id="signupform" className="signup__form">
            <div className="signup__fields">
              <label htmlFor="email" className="signup__label">
                EMAIL:
              </label>
              <input
                type="text"
                className="signup__input"
                name="email"
                placeholder="Enter your email"
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
              />
            </div>
            <div className="signup__fields">
              <label htmlFor="password" className="signup__label">
                PASSWORD:
              </label>
              <input
                type="text"
                className="signup__input"
                name="password"
                placeholder="Enter a password between 3 - 16 characters long"
              />
            </div>
            <div className="signup__fields">
              <label htmlFor="confirmpassword" className="signup__label">
                CONFIRM PASSWORD:
              </label>
              <input
                type="text"
                className="signup__input"
                name="confirmpassword"
                placeholder="Confirm your password"
              />
            </div>
            <div className="signup__radiofield">
              <p className="signup__label">
                What kind of account do you want to make?
              </p>

              <input type="radio" className="signup__radio" name="type" />
              <label htmlFor="personal" className="signup__label">
                PERSONAL
              </label>

              <input
                type="radio"
                className="signup__radio"
                name="organisation"
              />
              <label htmlFor="organisation" className="signup__label">
                ORGANISATION
              </label>
            </div>
            <div className="signup__button-wrapper">
              <button className="signup__button">SUBMIT</button>
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
