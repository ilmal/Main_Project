import axios from "axios";
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { store } from "../..";


const UpdatePass = () => {
    // redirecting traffic

    const history = useHistory();

    console.log("THIS PATH IS WORKING", window.location.pathname)

    const location = useLocation();

    console.log("queryString.parse: ", queryString.parse(location.search)._id);

    const token = window.location.pathname.replace("/updatepass/", "")
    const id = queryString.parse(location.search)._id

    const sendData = (e) => {
        e.preventDefault()
        // checking if user not inseted passwords
        if (e.target.password1.value === "" || e.target.password2.value === "") {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Please fill in all fields below!"
            })
            return
        }

        // check if passwords match
        if (e.target.password1.value !== e.target.password2.value) {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "passwods do not match! (make sure there are no extra spaces!)"
            })
            return
        }

        axios.post(`${process.env.REACT_APP_BACKENDPROXY}/updatepassvalidation`, {
            token,
            id,
            newPassword: e.target.password1.value
        }).then(res => {
            if (res.data.type === "err") {
                console.log("err occured at updatePass: ", res.data.payload)
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: res.data.payload
                })
                return
            }

            history.push("/user/login");
            window.location.reload()
        })
    }

    const goBackFunc = () => {
        history.push("/user/login");
        window.location.reload()
    }

    return (
        <div className="loginMainBody">
            <form onSubmit={sendData} className="loginBody">
                <div className="loginForgetTitle">
                    <span>Update password</span>
                </div>
                <div className="loginForgetMainContainer">
                    <span>Insert your new password here!</span>
                    <div className="loginForm loginFormForget">
                        <input type="password" name="password1" className="loginInput loginInputForget" autoComplete="off" required />
                        <label className="loginLable loginLableForget">
                            <span className="loginLableValue" data-tip='test'>New pass</span>
                        </label>
                    </div>
                    <div className="loginForm loginFormForget">
                        <input type="password" name="password2" className="loginInput loginInputForget" autoComplete="off" required />
                        <label className="loginLable loginLableForget">
                            <span className="loginLableValue" data-tip='test'>Retype pass</span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="loginForgetButton">Update password</button>
                <div onClick={goBackFunc} className="loginForgetBack fas fa-arrow-left">
                    <span>Go back</span>
                </div>
            </form>
        </div>
    )



}

export default UpdatePass