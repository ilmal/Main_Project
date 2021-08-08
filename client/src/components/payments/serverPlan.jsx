import { CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useState } from "react"
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



const ServerPlan = (props) => {
    const [cardInfo, setCardInfo] = useState({
        email: "",
        cardNumber: "",
        cardDate: "",
        cardCVC: ""
    })
    const [success, setSuccess] = useState(false)
    const elements = useElements()
    const stripe = useStripe()

    const paymentSelection = (value) => {
        switch (value) {
            case "sub":
                return subscriptionPayment();
            case "oneTime":
                return OneTimePayment();
            default:
                return OneTimePayment();
        }
    }

    const OneTimePayment = () => {
        const handleSubmit = async (e) => {
            e.preventDefault()
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    email: e.target.email.value
                }
            })

            if (error) {
                console.error(error)
                return
            }
            try {
                const { id } = paymentMethod
                const response = await axios.post("/stripe", {
                    product: {
                        game: "minecraft",
                        plan: props.values.plan
                    },
                    id
                })
                if (response.data.success) {
                    console.log('%c%s', 'color: green', "successful payment")
                    setSuccess(true)
                }

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

    const subscriptionPayment = () => {

    }

    return (
        <>
            <div className="paymentInfoContainer">
                <div className="paymentInnerHeader">
                    <span>Info</span>
                    <div className="paymentInnerHeaderSeperator" />
                </div>
                <div className={props.values.plan + " paymentInfoPriceContainer"}>
                    <span className="paymentInfoPlan">{props.values.plan}</span>
                    <span className="paymentInfoPrice">{props.values.price}€</span>
                </div>
            </div>
            <div className="paymentDataContainer">
                <div className="paymentInnerHeader">
                    <span>Pay</span>
                    <div className="paymentInnerHeaderSeperator" />
                </div>
                <OneTimePayment />
                {/* INSERT A PROPER SOLUTION TO CHOSE BETWEEN ONE TIME PAYMENT AND SUBSCRIPTION */}
                {/* <div className="paymentInnerPaymentSelectionMain">

                </div> */}
            </div>
        </>
    )
}

export default ServerPlan


