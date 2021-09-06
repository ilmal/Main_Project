// modules
import { useState } from "react"

// redux
import { store } from "../../index"
import { signup, login } from "../../redux/actions/index"



export default () => {

    const [showSignup, setShowSignup] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showSignup) {
            // if the request is from the signup page
            // console.log("email: ", e.target.email.value)
            // console.log("pass1: ", e.target.pass1.value)
            // console.log("pass2: ", e.target.pass2.value)

            // making sure the passwords match
            if (e.target.pass1.value != e.target.pass2.value) {
                console.error("password do not match! Err at /payments/paymentLoginSignup.jsx")
                return store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: "The passwords do not match!"
                })
            }
            //generating a success message for the client
            // store.dispatch({
            //     type: "MESSAGE",
            //     payload: "Signup success!"
            // })

            // sending the name, email, pass and store to the redux action
            console.log("sending data")
            return signup(e.target.email.value.split("@")[0], e.target.email.value, e.target.pass1.value, store.dispatch)
        }
        // if the request is from the login page
        // console.log("email: ", e.target.email.value)
        // console.log("pass: ", e.target.pass.value)

        return login(e.target.email.value, e.target.pass.value, store.dispatch)
    }

    const loginComponent = () => {
        return (
            <form className="paymentLoginMainContainer" onSubmit={handleSubmit}>
                <span className="paymentLoginSignupHeader">LOGIN</span>
                <div className="paymentLoginSignupsHeaderSeperator" />
                <input name="email" className="paymentLoginEmail" type="email" placeholder="Name/Email" required />
                <input name="pass" className="paymentLoginPassword" type="password" placeholder="Password" required />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Login</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Don't have an account? Sign up</span>
                </div>
            </form>
        )

    }

    const signupComponent = () => {
        return (
            <form className="paymentSignupMainContainer" onSubmit={handleSubmit}>
                <span className="paymentLoginSignupHeader">SIGNUP</span>
                <div className="paymentLoginSignupsHeaderSeperator" />
                <input name="email" className="paymentSignupEmail" type="email" placeholder="Email" required />
                <input name="pass1" className="paymentSignupPassword1" type="password" placeholder="Password" required />
                <input name="pass2" className="paymentSignupPassword2" type="password" placeholder="Retype Password" required />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Signup</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Don't have an account? Sign up</span>
                </div>
            </form>
        )
    }

    if (showSignup) return signupComponent();
    return loginComponent();
}

