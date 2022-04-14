// modules
import axios from "axios"
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import store from "../../store"
import { useHistory } from "react-router-dom";
import { StartServer } from "../../redux/actions"

// images
import amexIcon from "../../images/stripe/amexIcon.svg"
import visaIcon from "../../images/stripe/mastercardIcon.svg"
import mastercardIcon from "../../images/stripe/visaIcon.svg"
import cvcIcon from "../../images/stripe/cvcIcon.svg"

const CARD_OPTIONS = {
    iconStyle: "solid",
    type: "card",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1.3rem",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export const OneTimePayment = (props) => {
    const elements = useElements()
    const stripe = useStripe()
    const history = useHistory()
    const ref = null

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("useQuery: ", store.getState().querySelectors)
        console.log("cookies: ", store.getState().cookies.ref)

        console.log("EMAIL: ", e.target.email.value, store.getState().user.email)

        // if (e.target.email.value === !store.getState().user.email) { // if the input email match the user email
        //     store.dispatch({
        //         type: "ERR_MESSAGE",
        //         payload: "The email address entered doesn't match the loged in user, make sure you use the same email"
        //     })
        // }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
            billing_details: {
                email: e.target.email.value
            }
        })

        if (error) {
            console.error("Error from file payments.jsx: ", error)
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: error.message
            })
            return
        }

        const checkForPastServer = () => { // function for one of the values sent to backend
            if (store.getState().querySelectors?._id) return store.getState().querySelectors?._id
            return false
        }

        try {
            const { id } = paymentMethod
            const response = await axios.post("/stripe", {
                is_past_server: checkForPastServer(),
                product: {
                    game: "minecraft",
                    plan: props.values.plan
                },
                id,
                ref: store.getState().cookies.ref,
                userID: store.getState().cookies.userID
            })
            // dispaying err if response is err

            console.log("RESPONSEDATA: ", response.data.success)

            if (!response.data.success) {
                console.log('%c%s', 'color: red', "payment failed")
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: "Something went wrong with the payment!"
                })
                return
            }

            // dispaying passForm if response is passFormful
            console.log('%c%s', 'color: green', "passFormful payment")
            store.dispatch({
                type: "MESSAGE",
                payload: "Payment Successfull!"
            })
            history.push("/user/home");
            window.location.reload()
            store.dispatch(StartServer)
            return

        } catch (error) {
            console.error(error)
        }


        console.log(paymentMethod)
    }
    return (
        <form className="paymentOneTimeMainContainer" onSubmit={handleSubmit}>
            <div className="paymentOneTimeEmail">
                <input type="email" name="email" placeholder="Email" autoComplete="off" required />
            </div>
            <div className="paymentOneTimeCardDetails1">
                <div className="paymentCardElementCardNumber">
                    <div className="CardNumberElementDiv">
                        <CardNumberElement options={CARD_OPTIONS} />
                    </div>
                    <div className="cardIcons">
                        <img src={amexIcon} />
                        <img src={visaIcon} />
                        <img src={mastercardIcon} />
                    </div>
                </div>

            </div>
            <div className="paymentOneTimeCardDetails2">
                <div className="paymentCardElementCardExpiry">
                    <CardExpiryElement options={CARD_OPTIONS} />
                </div>
                <div className="paymentCardElementCardCvc">
                    <div className="CardNumberElementDiv">
                        <CardCvcElement options={CARD_OPTIONS} />
                    </div>
                    <div className="cardIcons">
                        <img src={cvcIcon} />
                    </div>
                </div>
            </div>
            <div className="paymentOneTimeSubmitContainer">
                <button type="submit">Pay</button>
            </div>
        </form>
    )
}
