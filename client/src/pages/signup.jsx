import axios from "axios";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../index"
import { signup } from "../redux/actions/index"
import ReactTooltip from 'react-tooltip';

const SignupPage = () => {

  const history = useHistory();

  useEffect(() => {
    if (store.getState().auth) {
      history.push("/user/home");
      window.location.reload();
    }
  }, [])

  const postReq = (e) => {
    e.preventDefault();
    signup(e.target.name.value, e.target.email.value, e.target.password.value, store.dispatch)
  };

  const toLogin = () => {
    history.push("/user/login");
    window.location.reload();
  }

  return (
    <div className="signupMainBody">
      <div className="SignupBody">
        <div className="signUpContainerHeader">
          <span>SIGN UP</span>
        </div>
        <form onSubmit={postReq} className="loginCenterInnerContainer">
          <div className="signupForm signupFormName">
            <input
              type="text"
              name="name"
              className="loginInput"
              autoComplete="off"
              required
            />
            <label className="loginLable">
              <span className="loginLableValue">Name</span>
            </label>
          </div>
          <div className="signupForm signupFormEmail">
            <input
              type="text"
              name="email"
              className="loginInput"
              autoComplete="off"
              required
            />
            <label className="loginLable">
              <span className="loginLableValue">Email</span>
            </label>
          </div>
          <div className="signupForm signupFormPassword">
            <input
              type="password"
              name="password"
              className="loginInput"
              autoComplete="off"
              required
            />
            <label className="loginLable">
              <span className="loginLableValue">Password</span>
            </label>
          </div>
          <button type="submit" className="signupForm signupButton">
            submit
          </button>
          <span onClick={toLogin}>Already signed up?</span>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
