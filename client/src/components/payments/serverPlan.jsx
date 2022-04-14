// modules
import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from "axios";

// redux
import store from "../../store"

// custom hooks
import usePaymentLoginSignupHook from "./paymentLoginSignup";

// custom files
import { passFormPayment, failPayment } from "./paymentHandler"
import { OneTimePayment } from "./payments"

const ServerPlan = (props) => {

    // const [passForm, setpassForm] = useState("default")
    const [passForm, setpassForm] = useState("default")
    const [initalPageLoad, setInitalPageLoad] = useState(true)
    const [calcRefPrice, setCalcRefPrice] = useState(props.values.price)
    const [discountPercentage, setDiscountPercentage] = useState(0)

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

    // checking if price should have discount
    const calcPrice = async (past_server_price) => {
        let discount = 0
        // if there is a ref in cookies, send to backend and get back discount in percent, then calculate new price with discount and parse into "calcRefPrice" state
        if (store.getState().cookies.ref) {
            discount = await axios.post("/stripe/getRefPrice", {
                ref: store.getState().cookies.ref
            })
                .then(response => {
                    return response.data
                })
        }
        console.log("REF PRICE CALCULATED: ", calcRefPrice)
        setDiscountPercentage(discount)
        setCalcRefPrice(parseInt(past_server_price ? past_server_price : props.values.price) * (1 - (discount / 100)))
    }

    useEffect(() => {
        if (initalPageLoad) {
            setInitalPageLoad(false)
            calcPrice()
        }
    })

    useEffect(() => {
        setInitalPageLoad(true)
    }, [props.values])

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

    if (props.values.type === "past_servers") {     // checking if the loaded payment is for an already existing server

        const isLoggedInFunc = () => {
            if (userData.auth) {
                return (
                    OneTimePayment(props)
                )
            }
            history.push("/")
            window.location.reload()
        }

        const findPastServerFunc = () => {
            for (let i = 0; i < store.getState().user.past_servers.length; i++) {
                const server = store.getState().user.past_servers[i]
                if (server.server_id != props.values.payload) continue
                return {
                    price: store.getState().productInfo[server.plan.toLowerCase()].price,
                    plan: server.plan
                }
            }
            console.log('%c%s', 'color: red', "ERR, SERVER NOT FOUND AT: serverPlan.jsx/findPastServerFunc")
        }

        const serverData = findPastServerFunc()

        const past_server_price = serverData.price * (1 - (discountPercentage / 100))

        const plansDisplayFunc = () => {

            let returnArr = []

            for (const key in store.getState().productInfo) { // not array, err

                const ele = (
                    <div className={key.toUpperCase() + " planOptionDiv"} key={key}>
                        <span>{key.toUpperCase()}</span>
                    </div>
                )
                returnArr.push(ele)
                console.log("returnArr: ", returnArr)
            }

            return returnArr
        }

        return (
            <>
                <div className="paymentInfoContainer">
                    <div className="paymentInnerHeader">
                        <span>Info</span>
                        <div className="paymentInnerHeaderSeperator" />
                    </div>
                    <div className={serverData.plan + " paymentInfoPriceContainer" + " paymentInfoUpgradePlan"}>

                        {/* add visual server name for easy recognition, for example "server name: <server name>" */}

                        <span className="paymentInfoPlan">{serverData.plan}</span>
                        <span className="paymentInfoPrice">{past_server_price}€</span>
                        {
                            discountPercentage > 0 ?
                                <div>
                                    <span className="paymentInfoPriceCalculationReferal">Discount from <span>{store.getState().cookies.ref.toUpperCase()}</span></span>
                                    <span className="paymentInfoPriceCalculationPrice">{serverData.price}€ - {discountPercentage}% <span className="fas fa-long-arrow-alt-right" /> {past_server_price}€</span>
                                </div> : null}
                    </div>
                    <div className="upgradePlan">
                        <span>Upgrade Plan</span>
                        <div className="paymentInnerHeaderSeperator" />
                        <div className="mainDiv">
                            {plansDisplayFunc()}
                        </div>
                    </div>
                </div>
                <div className="paymentDataContainer">
                    <div className="paymentInnerHeader">
                        <span>Pay</span>
                        <div className="paymentInnerHeaderSeperator" />
                    </div>
                    {isLoggedInFunc()}
                </div>
                {paymentHandler()}
            </>
        )
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
                    <span className="paymentInfoPrice">{calcRefPrice}€</span>
                    {
                        discountPercentage > 0 ?
                            <div>
                                <span className="paymentInfoPriceCalculationReferal">Discount from <span>{store.getState().cookies.ref.toUpperCase()}</span></span>
                                <span className="paymentInfoPriceCalculationPrice">{props.values.price}€ - {discountPercentage}% <span className="fas fa-long-arrow-alt-right" /> {calcRefPrice}€</span>
                            </div> : null}
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


