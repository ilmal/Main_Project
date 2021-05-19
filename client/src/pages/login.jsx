import { login } from "../redux/actions/index";
import React, { useEffect } from "react";
import ReactTooltip from 'react-tooltip';
import { useHistory } from "react-router-dom";
import { store } from "..";

const LoginPage = () => {
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
                            <span className="loginLableValue" data-tip='test'>Name</span>
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
                <span className="loginSignUp" onClick={toSignup}>First time? Sign up!</span>
            </div>
        </div >
    );
}

export default LoginPage;