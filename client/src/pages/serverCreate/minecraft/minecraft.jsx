import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"

import MinecraftLevels from "./minecraftLevels"
import { store } from "../../..";

const MinecraftCreate = () => {

    //const [isCardPressed, setisCardPressed] = useState("not pressed")
    const [isCardPressed, setisCardPressed] = useState(() => {
        if (localStorage.getItem("isCardPressed")) return localStorage.getItem("isCardPressed")
        return "not pressed"
    })

    useEffect(() => {
        localStorage.setItem("isCardPressed", isCardPressed)
    }, [isCardPressed])


    // ----------- stripe -------------

    const PUBLIC_KEY = "pk_test_51JCk7wGWd5hOwkfP4Q7UpN498uJW5oa2q7vb97viqghzRSpqilFLqtCB161iX4LOg68mkwqwHaptGyl0rgaB5NSf0080vAPRe9"

    const stripeLoad = loadStripe(PUBLIC_KEY)

    //---------------------------------

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
                {/* <div className="testServerCard">
                    <div>
                        <div className="testHeader">
                            <span>Test server</span>
                        </div>
                        <div className="container">
                            <div>
                                <span>Early access!</span>
                                <button onClick={() => setisCardPressed("test")}>Get the server</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container">
                    <div className="minecraftCards basic" onClick={() => setisCardPressed("basic")}>
                        <div className="titleContainer basicTitleContainer">
                            <span>BASIC</span>
                        </div>
                        <div className="priceContainer">
                            <span>€{store.getState().productInfo.basic.price} <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">{store.getState().productInfo.basic.cpu} cores</span>
                            <span className="memSpecValue">{store.getState().productInfo.basic.mem}gb</span>
                        </div>
                        <div className="seperationline" />
                        <div className="description">
                            <span>The basic server is the perfect option for a small group of friends, works great for 3 players</span>
                        </div>
                    </div>
                    <div className="minecraftCards normal" onClick={() => setisCardPressed("normal")}>
                        <div className="titleContainer normalTitleContainer">
                            <span>NORMAL</span>
                        </div>
                        <div className="priceContainer">
                            <span>${store.getState().productInfo.normal.price} <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">{store.getState().productInfo.normal.cpu} cores</span>
                            <span className="memSpecValue">{store.getState().productInfo.normal.mem}gb</span>
                        </div>
                        <div className="seperationline" />
                        <div className="description">
                            <span>This is the server made for a larger group of friends, works great for 6 players</span>
                        </div>
                    </div>
                    <div className="minecraftCards premium serverLandingPageCardSoldOutTemplate" onClick={() => setisCardPressed("premium")}>
                        <div className="serverLandingPageCardSoldOutDiv" style={{ display: "none" }}>
                            <div className="serverLandingPageCardSoldOutBlurDiv" />
                            <div className="serverLandingPageCardSoldOutMiddleDiv">
                                <span>HELLO!</span>
                            </div>
                            <div className="serverLandingPageCardSoldOutBlurDiv" />
                        </div>
                        <div className="titleContainer premiumTitleContainer">
                            <span>PREMIUM</span>
                        </div>
                        <div className="priceContainer">
                            <span>${store.getState().productInfo.premium.price} <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">{store.getState().productInfo.premium.cores} cores</span>
                            <span className="memSpecValue">{store.getState().productInfo.premium.mem}gb</span>
                        </div>
                        <div className="seperationline" />
                        <div className="description">
                            <span>This is the server made for a large group of players, works great for 10 players</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

export default MinecraftCreate;
