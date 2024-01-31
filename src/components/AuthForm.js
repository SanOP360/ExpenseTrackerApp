
import React, { useState, useRef } from "react";
import { useDispatch} from "react-redux";
import classes from "./AuthForm.module.css";
import { authActions } from "./store/authSlice";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(false);

  const triggerActions = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Authentication failed");
      }

      const data = await response.json();
      console.log("Successfully created an account");
      console.log(data.idToken);
      dispatch(authActions.login(data.idToken));
      navigate("/Expense");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }

    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  const forgotPasswordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error?.message || "Failed to send password reset request"
        );
      }

      await response.json();
      console.log("Successfully sent the request to change password");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      {isLogin && <h1>Login</h1>}
      {!isLogin && <h1>Signup</h1>}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && !isLogin && (
            <button className={classes.loginLogout}>SignUp</button>
          )}
          {!isLoading && isLogin && (
            <button className={classes.loginLogout}>Login</button>
          )}
          {isLoading && <p>Loading...</p>}

          {!isLogin && (
            <button
              type="button"
              className={classes.signBtn}
              onClick={triggerActions}
            >
              Already have an account? SignIn
            </button>
          )}
          {isLogin && (
            <button
              type="button"
              className={classes.signBtn}
              onClick={triggerActions}
            >
              Don't have an account? SignUp
            </button>
          )}

          {isLogin && (
            <button
              type="button"
              className={classes.forgotPassBtn}
              onClick={forgotPasswordHandler}
            >
              Forgot Password
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
