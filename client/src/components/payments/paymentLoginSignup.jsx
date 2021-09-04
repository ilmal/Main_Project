// modules
import { useState } from "react"

export default () => {

    const [showSignup, setShowSignup] = useState(true)

    const login = () => {
        return (
            <div className="paymentLoginMainContainer">
                <span className="paymentLoginSignupHeader">LOGIN</span>
                <div className="paymentLoginSignupsHeaderSeperator" />
                <input className="paymentLoginEmail" type="text" placeholder="Email" />
                <input className="paymentLoginPassword" type="text" placeholder="Password" />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Login</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Don't have an account? Sign up</span>
                </div>
            </div>
        )

    }

    const signup = () => {
        return (
            <div className="paymentSignupMainContainer">
                <span className="paymentLoginSignupHeader">SIGNUP</span>
                <div className="paymentLoginSignupsHeaderSeperator" />
                <input className="paymentSignupEmail" type="text" placeholder="Email" />
                <input className="paymentSignupPassword1" type="text" placeholder="Password" />
                <input className="paymentSignupPassword2" type="text" placeholder="Retype Password" />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Signup</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Don't have an account? Sign up</span>
                </div>
            </div>
        )
    }

    if (showSignup) return signup();
    return login();
}

