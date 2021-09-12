// modules
import { useState, useEffect } from "react"

// redux
import { store } from "../../index"
import { signup, login, resendConfirmationMail } from "../../redux/actions/index"



export default () => {

    const [showSignup, setShowSignup] = useState(true)
    const [verifySignup, setVerifySignup] = useState(true)
    const [clientNoMail, setClientNoMail] = useState(false)
    const [user, setUser] = useState({ email: "loading" })

    // updating store 
    useEffect(() => {
        if (store.getState().user != "This user doesn't exist") {
            setUser(store.getState().user)
        }
    }, [])


    // enable disable scroll paymentHandler
    useEffect(() => {
        if (verifySignup) return document.body.style.overflow = "hidden"
        return document.body.style.overflow = "scroll"
    }, [verifySignup])

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

            // setting state for showing verify signup true
            setVerifySignup(true)

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
        // showing signup verification if state verifySignup is true
        if (verifySignup) return (
            <div className="paymentVerificationSignupMainBody">
                <div className="paymentVerificationSignupBody">
                    <div className="paymentVerificationMessageBody">
                        <span>Follow the link sent to <span> {user.email} </span> and verify you account!</span>
                        <div className="noMailLine" />
                        {clientNoMail ?
                            <div className="noMail">
                                <span>Make sure to check the spam folder!</span>
                                <span>Still can't find it? Just send another one!</span>
                                <button onClick={() => store.dispatch(resendConfirmationMail)}>Send another mail to {user.email}</button>
                            </div>
                            :
                            <div>
                                <span onClick={() => setClientNoMail(true)}>Can't find the email?</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
        return (
            <form className="paymentSignupMainContainer" onSubmit={handleSubmit}>
                <span className="paymentLoginSignupHeader">SIGNUP</span>
                <div className="paymentLoginSignupsHeaderSeperator" />
                <input name="email" className="paymentSignupEmail" type="email" placeholder="Email" required />
                <input name="pass1" className="paymentSignupPassword1" type="password" placeholder="Password" required />
                <input name="pass2" className="paymentSignupPassword2" type="password" placeholder="Retype Password" required />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Signup</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Already have an account? Login</span>
                </div>
            </form>
        )
    }

    if (showSignup) return signupComponent();
    return loginComponent();
}

