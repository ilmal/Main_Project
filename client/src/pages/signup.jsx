import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { store } from "../index"
import { signup, resendConfirmationMail } from "../redux/actions/index"

const SignupPage = () => {

  const history = useHistory();

  const [toggle, setToggle] = useState(true)
  const [noMail, setNoMail] = useState(false)
  const [user, setUser] = useState({ email: "loading" })

  useEffect(() => {
    if (store.getState().auth) {
      history.push("/user/home");
      window.location.reload();
    }
    if (store.getState().user != "This user doesn't exist") {
      setUser(store.getState().user)
      setToggle(false)
    }
  }, [])

  const verifyEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const postReq = (e) => {
    e.preventDefault();
    if (!verifyEmail(e.target.email.value)) {
      store.dispatch({
        type: "ERR_MESSAGE",
        payload: "Please insert a valid email"
      })
      return
    }
    setToggle(!toggle)
    signup(e.target.name.value, e.target.email.value, e.target.password.value, store.dispatch)
  };

  const toLogin = () => {
    history.push("/user/login");
    window.location.reload();
  }

  const changeMailToggle = () => {
    setNoMail(true)
  }

  const inputPage = () => {
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
  }

  const messagePage = () => {
    return (
      <div className="signupMainBody">
        <div className="SignupBody">
          <div className="messageBody">
            <span>Follow the link sent to {user.email} to verify you account!</span>
            <div className="noMailLine" />
            {noMail ?
              <div className="noMail">
                <span>Make sure to check the spam folder!</span>
                <span>Still can't find it? Just send another one!</span>
                <button onClick={() => store.dispatch(resendConfirmationMail)}>Send another mail to {user.email}</button>
              </div>
              :
              <div>
                <span onClick={changeMailToggle}>Can't find the email?</span>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }

  switch (toggle) {
    case false:
      return messagePage();
    default:
      return inputPage();
  }

};

export default SignupPage;
