import React, { Component } from "react";
import axios from "axios";

const SignupPage = () => {

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
    });
    e.preventDefault();
  };

  return (
    <div className="loginMainBody">
      <div className="SignupBody">
        <div className="signUpContainerHeader">
          <span>SIGN UP</span>
        </div>
        <form onSubmit={postReq} className="loginCenterInnerContainer">
          <div className="loginForm">
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
          <div className="loginForm">
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
          <div className="loginForm">
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
          <button type="submit" className="loginButton">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
