import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"

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
    return (
        <>
            <div className="paymentInfoContainer">
                <div className="paymentInfoHeader">
                    <span>Info</span>
                    <div className="paymentInfoHeaderSeperator" />
                </div>
                <span className="paymentInfoCompanyName">U1Servers</span>
                <span className="paymentInfoPlan">{props.values.plan}</span>
                <span className="paymentInfoPrice">{props.values.price}</span>

            </div>
            <div className="paymentDataContainer">

            </div>
            <CardElement options={CARD_OPTIONS} />
        </>
    )
}

export default ServerPlan