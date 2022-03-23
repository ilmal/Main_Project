import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

import MinecraftLevels from "./minecraftLevels"
import store from "../../../store";
import { availableServerTeirs } from "../../../redux/actions"
import { useHistory } from "react-router-dom";

const MinecraftCreate = () => {

    const history = useHistory()

    //const [isCardPressed, setisCardPressed] = useState("not pressed")
    const [isCardPressed, setisCardPressed] = useState(() => {
        if (localStorage.getItem("isCardPressed")) return localStorage.getItem("isCardPressed")
        return "not pressed"
    })

    useEffect(() => {
        localStorage.setItem("isCardPressed", isCardPressed)
    }, [isCardPressed])

    useEffect(async () => {
        await store.dispatch(availableServerTeirs)
    }, [])

    const [update, setUpdate] = useState(false)

    store.subscribe(() => {
        setUpdate(!update)
    })

    useEffect(() => { // effect for handling users with an "_id" queryparam, this is for renewing past servers

        // check if user is logged in
        if (store.getState().user === "default" && store.getState().querySelectors?._id) { history.push("/"); window.location.reload() }

        for (let i = 0; i < store.getState().user.past_servers.length; i++) {
            if (store.getState().querySelectors?._id === store.getState().user.past_servers[i].server_id) return setisCardPressed(store.getState().user.past_servers[i].plan.toLowerCase())
        }
    }, [update])

    // ----------- stripe -------------

    const PUBLIC_KEY = "pk_test_51JCk7wGWd5hOwkfP4Q7UpN498uJW5oa2q7vb97viqghzRSpqilFLqtCB161iX4LOg68mkwqwHaptGyl0rgaB5NSf0080vAPRe9"

    const stripeLoad = loadStripe(PUBLIC_KEY)

    //---------------------------------

    const landingPageFunc = () => {
        // element for sold out layout. To use, add this func at the start of the element
        // also add the className "serverLandingPageCardSoldOutTemplate" to the parent element

        // in future make this automatic, add value in db then extract value and based on that
        // update the parent ele class and insert this func to the element (future work)

        const isSoldOut = (selectedTeir) => {
            let result = false
            if (store.getState().availableServerTeirs === null) return null
            Object.keys(store.getState().availableServerTeirs).forEach((teir) => {
                if (teir.toUpperCase() === selectedTeir && !store.getState().availableServerTeirs[teir].value) {
                    result = true
                }
            })

            if (result) {
                //console.log("CLASSNAME: ", document.getElementsByClassName(selectedTeir.toLowerCase()))
                return (
                    <div className="serverLandingPageCardSoldOutDiv">
                        <div className="serverLandingPageCardSoldOutBlurDivTop" />
                        <div className="serverLandingPageCardSoldOutMiddleDiv">
                            <div className="serverLandingPageCardSoldOutMiddleDivInner">
                                <span>Sorry,</span>
                                <span>this server is currently out of stock.</span>
                            </div>
                        </div>
                        <div className="serverLandingPageCardSoldOutBlurDivBottom" />
                    </div>
                )
            }
            return null
        }

        console.log("PRODUCT INFO: ", store.getState())
        const element_array = []
        Object.keys(store.getState().productInfo).forEach(element => {
            element_array.push(
                <div className={(isSoldOut(element.toUpperCase()) !== null) ? "minecraftCards" + " " + element + " " + "serverLandingPageCardSoldOutTemplate" : "minecraftCards" + " " + element} onClick={() => setisCardPressed(element)}>
                    {isSoldOut(element.toUpperCase())}
                    <div className={"titleContainer" + " " + `${element.toLowerCase()}TitleContainer`}>
                        <span>{element.toUpperCase()}</span>
                    </div>
                    <div className="priceContainer">
                        <span>€{store.getState().productInfo[element].price} <span className="priceMonth">/ month</span></span>
                    </div>
                    <div className="specsContainer">
                        <span className="cpuSpec">CPU</span>
                        <span className="memSpec">MEMORY</span>
                        <span className="cpuSpecValue">{store.getState().productInfo[element].cpu} cores</span>
                        <span className="memSpecValue">{store.getState().productInfo[element].mem}gb</span>
                    </div>
                    <div className="seperationline" />
                    <div className="description"> {/* NEED TO CHANGE THIS TO THE BD AND EXTRACT DATA FROM THERE*/}
                        <span>The basic server is the perfect option for a small group of friends, works great for 3 players</span>
                    </div>
                </div>
            )
        })
        return element_array
    }

    if (isCardPressed !== "not pressed") {
        switch (isCardPressed) {
            case "test":
                return (
                    <Elements stripe={stripeLoad}>
                        <MinecraftLevels level="test" />
                    </Elements>
                )
            case "basic":
                return (
                    <Elements stripe={stripeLoad}>
                        <MinecraftLevels level="basic" />
                    </Elements>)
            case "normal":
                return (
                    <Elements stripe={stripeLoad}>
                        <MinecraftLevels level="normal" />
                    </Elements>)
            case "premium":
                return (
                    <Elements stripe={stripeLoad}>
                        <MinecraftLevels level="premium" />
                    </Elements>)
            default:
                //window.location.reload();
                break;
        }
    } else {
        return (
            <div className="minecraftBody">
                <span>Choose your Minecraft Server!</span>
                <div className="container">
                    {landingPageFunc()}
                </div>
            </div>
        )
    }

};

export default MinecraftCreate;
