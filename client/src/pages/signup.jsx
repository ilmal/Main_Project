import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { store } from "../index"

const SignupPage = () => {

  const history = useHistory();

  const postReq = (e) => {
    console.log("Name: ", e.target.name.value);
    console.log("Email: ", e.target.email.value);
    console.log("Password: ", e.target.password.value);

    axios.post("/user/insert", {
      data: {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
    })
      .then(response => {
        console.log(response.data)
        if (response.data === "User created") {
          store.dispatch({
            type: "MESSAGE",
            payload: response.data
          })
        }
        store.dispatch({
          type: "ERR_MESSAGE",
          payload: response.data
        })
      })
    e.preventDefault();
    history.push("/user/login");
    window.location.reload();
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
