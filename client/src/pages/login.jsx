import { login } from "../redux/actions/index";
import React, { useEffect, useState } from "react";
import ReactTooltip from 'react-tooltip';
import { useHistory } from "react-router-dom";
import { store } from "..";

import ForgotPassComponent from "../components/login/forgetPass";

const LoginPage = () => {
    const [forgotPass, setForgotPass] = useState(false)

    const history = useHistory();

    ReactTooltip.rebuild()

    useEffect(() => {
        if (store.getState().auth) {
            history.push("/user/home");
            window.location.reload();
        }
    }, [])

    const sendData = async (data) => {
        console.log("name: ", data.target.name.value, "pass: ", data.target.password.value)
        data.preventDefault()
        login(data.target.name.value, data.target.password.value, store.dispatch)
    }

    const toSignup = () => {
        history.push("/user/signup");
        window.location.reload();
    }

    const forgotPassFunc = () => {
        setForgotPass(true)
    }

    if (forgotPass) {
        console.log("forgotPassThingy")
        return (
            <ForgotPassComponent />
        )
    }

    return (
        <div className="loginMainBody">
            <div className="loginBody">
                <div className="signUpContainerHeader">
                    <span>LOGIN</span>
                </div>
                <form onSubmit={sendData} method="POST" className="loginCenterInnerContainer">
                    <div className="loginForm">
                        <input type="text" name="name" className="loginInput" autoComplete="off" required />
                        <label className="loginLable">
                            <span className="loginLableValue" data-tip='test'>Name/ Email</span>
                        </label>
                    </div>
                    <div className="loginForm">
                        <input type="password" name="password" className="loginInput" autoComplete="off" required />
                        <label className="loginLable">
                            <span className="loginLableValue">Password</span>
                        </label>
                    </div>
                    <button type="submit" className="loginButton">submit</button>
                </form>
                <div className="loginLinks">
                    <span className="loginForgotPass" onClick={forgotPassFunc}>Forgot password?</span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;