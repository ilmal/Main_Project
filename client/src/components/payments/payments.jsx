// modules
import axios from "axios"
import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { store } from "../../index"

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
    const ref = null

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("useQuery: ", store.getState().querySelectors)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
            billing_details: {
                email: e.target.email.value
            }
        })

        if (error) {
            console.error("Error from file payments.jsx: ", error)
            return
        }
        try {
            const { id } = paymentMethod
            const response = await axios.post("/stripe", {
                product: {
                    game: "minecraft",
                    plan: props.values.plan
                },
                id,
                ref: document.cookie.ref
            })
            // dispaying err if response is err
            if (!response.data.sucess) {
                console.log('%c%s', 'color: red', "payment failed")
                return
            }

            // dispaying passForm if response is passFormful
            console.log('%c%s', 'color: green', "passFormful payment")
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