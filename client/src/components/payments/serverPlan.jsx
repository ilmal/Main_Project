import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useState } from "react"

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
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
        const handleSubmit = (e) => {
            e.perventDefaults()
            setCardInfo({
                ...cardInfo,
                email: e.target.email.value
            })
        }
        return (
            <form className="paymentOneTimeMainContainer" onSubmit={handleSubmit}>
                <div className="paymentOneTimeEmail">
                    <input type="text" name="email" autoComplete="off" required />
                    <label>
                        <span>Email</span>
                    </label>
                </div>
                <div className="paymentOneTimeCardDetails">
                </div>
                <CardElement options={CARD_OPTIONS} />
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