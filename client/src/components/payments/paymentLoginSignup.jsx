// modules
import { useState } from "react"

// redux
import store from "../../store"
import { signup, login } from "../../redux/actions/index"



const usePaymentLoginSignupFunc = () => {

    const [showSignup, setShowSignup] = useState(true)
    // const [verifySignup, setVerifySignup] = useState(true)
    // const [clientNoMail, setClientNoMail] = useState(false)   // NOT YET IMPLEMENTED SEE BELOW 
    // const [user, setUser] = useState({ email: "loading" })

    // // updating store 
    // useEffect(() => {
    //     if (store.getState().user != "This user doesn't exist") {  // NOT YET IMPLEMENTED SEE BELOW 
    //         setUser(store.getState().user)
    //     }
    // }, [])


    // // enable disable scroll paymentHandler
    // useEffect(() => {
    //     if (verifySignup) return document.body.style.overflow = "hidden"    // NOT YET IMPLEMENTED SEE BELOW 
    //     return document.body.style.overflow = "scroll"
    // }, [verifySignup])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (showSignup) {
            // if the request is from the signup page

            // making sure the passwords match
            if (e.target.pass1.value !== e.target.pass2.value) {
                console.error("password do not match! Err at /payments/paymentLoginSignup.jsx")
                return store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: "The passwords do not match!"
                })
            }
            // // generating a success message for the client
            // store.dispatch({
            //     type: "MESSAGE",
            //     payload: "Signup success!"
            // })

            // sending the name, email, pass and store to the redux action
            console.log("sending data")

            // // not yet implemented, see below
            // // setting state for showing verify signup true
            // setVerifySignup(true)

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
                <input name="email" className="paymentLoginEmail" type="text" placeholder="Name/Email" required />
                <input name="pass" className="paymentLoginPassword" type="password" placeholder="Password" required />
                <div className="paymentLoginSignupButtonLinkContainer">
                    <button>Login</button>
                    <span onClick={() => setShowSignup(!showSignup)}>Don't have an account? Sign up</span>
                </div>
            </form>
        )
    }

    const signupComponent = () => {

        // commented out section is for email confirmation. This I didn't feel was necessary while yhe user verifies through payment

        // // showing signup verification if state verifySignup is true
        // if (verifySignup) return (
        //     <div className="paymentVerificationSignupMainBody">
        //         <div className="paymentVerificationHeader">
        //             <span>Follow the link sent to <span> {user.email} </span> and verify you account!</span>
        //         </div>
        //         <div className="paymentVerificationNoMailLine" />
        //         {clientNoMail ?
        //             <div className="paymentVerificationNoMail">
        //                 <button onClick={() => store.dispatch(resendConfirmationMail)}>Send another mail to {user.email}</button>
        //             </div>
        //             :
        //             <div className="paymentVerificationLink">
        //                 <span onClick={() => setClientNoMail(true)}>Can't find the email?</span>
        //             </div>
        //         }
        //     </div>
        // )
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

export default usePaymentLoginSignupFunc