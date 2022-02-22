import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"
import React, { useEffect, useState } from 'react'
import ServerPlan from "../../../components/payments/serverPlan";
import store from "../../../store";
import { useLocation } from 'react-router';
import queryString from 'query-string';




// getting different data deplending on what server type selected
const levelValuesFunc = (propsLevel) => {
    const defaultValues = {
        "plan": propsLevel.toUpperCase(),
        "color": "$greenColor",
        "price": store.getState().productInfo[propsLevel].price,
        "cpu": store.getState().productInfo[propsLevel].cpu,
        "mem": store.getState().productInfo[propsLevel].mem,
        "storage": "Unlimited",
        "players": "4",
        "plugins": "Unavailable",
        "mods": "Unavailable"
    }

    switch (propsLevel) {
        case "basic":
            return {
                ...defaultValues,
                "color": "$greenColor",
                "players": "4",
            }
        case "normal":
            return {
                ...defaultValues,
                "color": "$blueColor",
                "players": "8",
            }
        case "premium":
            return {
                ...defaultValues,
                "color": "$pinkolor",
                "players": "12",
            }

        default:
            return {
                ...defaultValues
            }
    }
}

const useGetQuaryParams = () => {
    const location = useLocation();
    return queryString.parse(location.search)
}

const MinecraftLevels = (props) => {
    const history = useHistory();
    const state = useSelector(state => state)
    const queryParams = useGetQuaryParams()
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

    const changeLevelFunc = () => {

        const return_array = []
        let counter = 0
        Object.keys(store.getState().productInfo).forEach((e, idx) => {

            if (e.toUpperCase() === "") {
                return
            }
            // formula = n + (n + 1)
            const style = {
                gridColumn: `${2 * counter + 1}/${2 * counter + 2}`
            }
            counter++

            return_array.push(
                <div className={"changeLevel" + e.charAt(0).toUpperCase() + e.slice(1)} style={style} onClick={() => handleClick(e)}>
                    <div className="changeLevelinnerContainer">
                        <span>{e.toUpperCase()}</span>
                    </div>
                </div>
            )
        })
        return return_array
    }

    if (queryParams?._id) {
        console.log("YES")
        return (
            <div className="minecraftBasicBody oldServer">
                <div className="paymentBody">
                    <div className="header">
                        <span>Payment</span>
                    </div>
                    {paymentOptions(values.plan)}
                </div>
            </div>
        )
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
                    {changeLevelFunc()}
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