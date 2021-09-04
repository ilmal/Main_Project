// modules
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

// redux
import { store } from "../../index"

// custom hooks
import usePaymentLoginSignupHook from "./paymentLoginSignup";

// custom files
import { passFormPayment, failPayment } from "./paymentHandler"
import { OneTimePayment } from "./payments"

const ServerPlan = (props) => {
    // const [passForm, setpassForm] = useState("default")
    const [passForm, setpassForm] = useState("default")

    // redux
    const [userData, setUserData] = useState(store.getState())

    // history
    const history = useHistory();

    //customHook
    const paymentLoginSignupHook = usePaymentLoginSignupHook();

    store.subscribe(() => {
        setUserData(store.getState());
    });

    // enable disable scroll paymentHandler
    useEffect(() => {
        if (passForm != "default") {
            document.body.style.overflow = "hidden"
        } else if (passForm === "default") {
            document.body.style.overflow = "scroll"
        }
    }, [passForm])

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

    const paymentpassForm = () => {

    }

    const paymentFailure = () => {

    }

    const subscriptionPayment = () => {

    }

    const isLoggedInFunc = () => {
        if (userData.auth) {
            return (
                OneTimePayment(props)
            )
        }
        return (
            //OneTimePayment(props)
            paymentLoginSignupHook
        )
    }

    const paymentHandler = () => {
        switch (passForm) {
            case "passForm":
                return passFormPayment(history);
            case "fail":
                return failPayment();
            case "default":
                return null;
            default:
                return null;
        }
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
                {isLoggedInFunc()}
                {/* INSERT A PROPER SOLUTION TO CHOSE BETWEEN ONE TIME PAYMENT AND SUBSCRIPTION */}
                {/* <div className="paymentInnerPaymentSelectionMain">
                </div> */}
            </div>
            {paymentHandler()}
        </>
    )
}

export default ServerPlan


