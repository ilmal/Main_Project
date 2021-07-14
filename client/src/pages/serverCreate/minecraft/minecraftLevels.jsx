import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import axios from "axios"
import React, { useState } from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"



// getting different data deplending on what server type selected
const levelValuesFunc = (props) => {
    switch (props.level) {
        case "test":
            return ({
                "cpu": "1",
                "mem": "2",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
        case "basic":
            return {
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
        case "normal":
            return {
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
        case "premium":
            return {
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }

        default:
            return {
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            }
    }
}

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

const MinecraftLevels = (props) => {
    const history = useHistory(levelValuesFunc(props));

    const state = useSelector(state => state)
    const [values, setValues] = useState()
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

    const handleClick = (orgin) => {
        switch (origin) {
            case "basic":

                break;
            case "normal":

                break;
            case "premium":

                break;
            default:
                window.location.reload();
                break;
        }
    }

    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="innerHeader specHeader">
                    <span>Specs</span>
                </div>
                <div className="specsKeyValue">
                    <div className="specSeperator" />
                    <div className="specValue cpu">
                        <span>CPU<span className="value"> {levelValuesFunc(props).cpu} CORE </span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value"> {levelValuesFunc(props).mem} GB </span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">{levelValuesFunc(props).storage} storage</span></span>
                    </div>
                </div>
                <div className="innerHeader gameHeader">
                    <span>Game Features</span>
                </div>
                <div className="gameKeyValue">
                    <div className="gameSeperator" />
                    <div className="gameValue">
                        <span>Max players<span className="value">{levelValuesFunc(props).players}</span></span>
                    </div>
                    <div className="gameValue plugins">
                        <span>Plugins<span className="value">{levelValuesFunc(props).plugins}</span></span>
                    </div>
                    <div className="gameValue mods">
                        <span>Mods<span className="value">{levelValuesFunc(props).mods}</span></span>
                    </div>
                </div>
                <div className="changeLevelContainer">
                    <div className="changeLevelInnerHeader">
                        <span>Compare plans</span>
                    </div>
                    <div className="changeLevelSeperator" />
                    <div className="changeLevelBasic">
                        <div className="changeLevelinnerContainer" onClick={() => handleClick("basic")}>
                            <span>BASIC</span>
                        </div>
                    </div>
                    <div className="changeLevelNormal">
                        <div className="changeLevelinnerContainer">
                            <span>BASIC</span>
                        </div>
                    </div>
                    <div className="changeLevelPremium">
                        <div className="changeLevelinnerContainer">
                            <span>BASIC</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
                <div className="freeBody">
                    <button onClick={toServer}>Get FREE server</button>
                </div>

            </div>
        </div>
    )
};

export default MinecraftLevels