import "./SignUp.scss";

const SignUp = ({ isLoggedIn }) => {
  return (
    <div className="signup">
      {!isLoggedIn ? (
        <>
          <h1 className="signup__header">Sign Up</h1>
          <form action="" className="signup__form"></form>
        </>
      ) : (
        <p className="signup__error">You already have an account.</p>
      )}
    </div>
  );
};

export default SignUp;
