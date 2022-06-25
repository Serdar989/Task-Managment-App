import React, { useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import useInput from '../../hooks/use-input';
import '../../index.css';

const isSixChars = (value) => value.trim().length > 6 && value.trim() !== '';

const isEmail = (value) => value.includes('@') && value.trim() !== '';

const AuthForm = () => {
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isSixChars);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString(), data.email);
        navigate('/');
      })
      .catch((err) => {
        alert(err.message);
      });
    resetEmail();
    resetPassword();
  };

  const emailControlClasses = `${classes.control} ${
    emailHasError ? classes.invalid : ''
  }`;

  const passwordControlClasses = `${classes.control} ${
    passwordHasError ? classes.invalid : ''
  }`;

  return (
    <section className='auth'>
      <h1>{isLogin ? 'Please Login' : 'Please Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailControlClasses}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            value={emailValue}
            id='email'
            required
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p>Please enter a valid email!</p>}
        </div>
        <div className={passwordControlClasses}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && <p>Please enter a valid password!</p>}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button disabled={!formIsValid}>
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
