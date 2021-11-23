import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import React, { useState } from 'react'
import ServerPlan from "../../../components/payments/serverPlan";
import { store } from "../../..";



// getting different data deplending on what server type selected
const levelValuesFunc = (propsLevel) => {
    console.log("propsLevel: ", propsLevel)
    switch (propsLevel) {
        case "test":
            return ({
                "plan": "TEST",
                "color": "blue",
                "price": "15",
                "cpu": "1",
                "mem": "2",
                "storage": "Unlimited",
                "players": "4",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
        case "basic":
            return {
                "plan": "BASIC",
                "color": "$greenColor",
                "price": "15",
                "cpu": "2",
                "mem": "2",
                "storage": "Unlimited",
                "players": "4",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
        case "normal":
            return {
                "plan": "NORMAL",
                "color": "$blueColor",
                "price": "20",
                "cpu": "3",
                "mem": "4",
                "storage": "Unlimited",
                "players": "8",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
        case "premium":
            return {
                "plan": "PREMIUM",
                "color": "$pinkolor",
                "price": "25",
                "cpu": "4",
                "mem": "8",
                "storage": "Unlimited",
                "players": "12",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }

        default:
            return {
                "plan": "BASIC",
                "color": "$greenColor",
                "price": "10",
                "cpu": "2",
                "mem": "2",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
    }
}

const MinecraftLevels = (props) => {
    const history = useHistory();

    const state = useSelector(state => state)
    const [values, setValues] = useState(levelValuesFunc(props.level))
    const toServer = () => {
        console.log(state.auth)
        if (!state.auth) {
            history.push("/user/login");
            window.location.reload();
        } else {
            history.push("/user/home");
            window.location.reload();
        }
    }

    const handleClick = (origin) => {
        console.log(origin)
        // setting localstorage to the selected item for reloading persistance
        localStorage.setItem("isCardPressed", origin)
        setValues(levelValuesFunc(origin))
    }

    const paymentOptions = (data) => {
        let plan = "default"

        // cheking what payment should be displayed depending on plan
        if (data === "BASIC" |
            data === "NORMAL" |
            data === "PREMIUM"
        ) {
            plan = "default"
        }

        if (data === "TEST") {
            plan = "free"
        }

        switch (plan) {
            case "default":
                return (
                    <ServerPlan values={values} />
                )
            case "free":
                return (
                    <div className="freeBody">
                        <button onClick={toServer}>Get FREE server</button>
                    </div>
                )

            default:
                return (
                    <ServerPlan values={values} />
                )
        }
    }

    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="planContainer">
                    <span>Selected Plan</span>
                    <div className={values.plan + "ContainersSeperator upperContainersSeperator"} />
                    <div className="planContainerInner">
                        <div className={values.plan}>
                            <span >{values.plan}</span>
                        </div>
                    </div>
                </div>
                <div className="priceContainer">
                    <span>Price</span>
                    <div className="upperContainersSeperator" />
                    <div className="priceContainerInner">
                        <span>{values.price}€</span>
                        <p>/month</p>
                    </div>
                </div>
                <div className="specsConatiner">
                    <div className="specHeader">
                        <span>Specs</span>
                        <div className="specSeperator" />
                    </div>
                    <div className="specValue cpu">
                        <span>CPU<span className="value"> {values.cpu} CORE </span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value"> {values.mem} GB </span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">{values.storage} storage</span></span>
                    </div>
                </div>
                <div className="gameContainer">
                    <div className="specHeader">
                        <span>Game Features</span>
                        <div className="specSeperator" />
                    </div>
                    <div className="specValue cpu">
                        <span>Recomended players<span className="value">{values.players}</span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Plugins<span className="value">{values.plugins}</span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Mods<span className="value">{values.mods}</span></span>
                    </div>
                </div>
                <div className="changeLevelContainer">
                    <div className="changeLevelInnerHeader">
                        <span>Compare plans</span>
                    </div>
                    <div className="changeLevelSeperator" />
                    <div className="changeLevelBasic" onClick={() => handleClick("basic")}>
                        <div className="changeLevelinnerContainer">
                            <span>BASIC</span>
                        </div>
                    </div>
                    <div className="changeLevelNormal" onClick={() => handleClick("normal")}>
                        <div className="changeLevelinnerContainer">
                            <span>NORMAL</span>
                        </div>
                    </div>
                    <div className="changeLevelPremium" onClick={() => handleClick("premium")}>
                        <div className="changeLevelinnerContainer">
                            <span>PREMIUM</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
                {paymentOptions(values.plan)}
            </div>
        </div>
    )
};

export default MinecraftLevels