import axios from "axios"
import { authSucess, createMcConfig } from "../redux/actions/index"
import { store } from "../index"
import ReactTooltip from 'react-tooltip';
import { useHistory } from "react-router-dom";

const LoginPage = () => {

    const history = useHistory();

    ReactTooltip.rebuild()

    const sendData = async (data) => {
        console.log("name: ", data.target.name.value, "pass: ", data.target.password.value)
        data.preventDefault()
        axios.defaults.withCredentials = true
        await axios.post("http://localhost:3001/api/user/login", {
            name: data.target.name.value,
            password: data.target.password.value
        }).then(response => {
            if (response.data === "success") {
                store.dispatch(authSucess)
                console.log("1", store.getState().auth)
                create()
                window.location.reload()
            } else {
                console.log(response.data)
                ReactTooltip.show("test")
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: response.data
                })
            }
        })
    }

    const create = () => {
        store.dispatch(createMcConfig)
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