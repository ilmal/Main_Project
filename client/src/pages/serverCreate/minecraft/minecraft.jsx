import { useHistory } from "react-router-dom";
import { useState } from "react";

import { MinecraftTest, MinecraftBasic, MinecraftNormal, MinecraftPremuim } from "./serverLevels"

const MinecraftCreate = () => {

    const history = useHistory();
    const [isCardPressed, setisCardPressed] = useState("not pressed")


    if (isCardPressed !== "not pressed") {
        switch (isCardPressed) {
            case "test":
                return (
                    <MinecraftTest level="test" />
                )
            case "basic":
                return (
                    <MinecraftBasic level="basic" />
                )
            case "normal":
                return (
                    <MinecraftNormal level="normal" />
                )
            case "premium":
                return (
                    <MinecraftPremuim level="premium" />
                )
            default:
                window.location.reload();
                break;
        }
    } else {
        return (
            <div className="minecraftBody">
                <span>Choose your Minecraft Server!</span>
                <div className="testServerCard">
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
                </div>
                <div className="container">
                    <div className="minecraftCards basic" onClick={() => setisCardPressed("basic")}>
                        <div className="titleContainer basicTitleContainer">
                            <span>BASIC</span>
                        </div>
                        <div className="priceContainer">
                            <span>$?? <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">? cores</span>
                            <span className="memSpecValue">?gb</span>
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
                            <span>$?? <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">? cores</span>
                            <span className="memSpecValue">?gb</span>
                        </div>
                        <div className="seperationline" />
                        <div className="description">
                            <span>This is the server made for a larger group of friends, works great for 6 players</span>
                        </div>
                    </div>
                    <div className="minecraftCards premium" onClick={() => setisCardPressed("premium")}>
                        <div className="titleContainer premiumTitleContainer">
                            <span>PREMIUM</span>
                        </div>
                        <div className="priceContainer">
                            <span>$?? <span className="priceMonth">/ month</span></span>
                        </div>
                        <div className="specsContainer">
                            <span className="cpuSpec">CPU</span>
                            <span className="memSpec">MEMORY</span>
                            <span className="cpuSpecValue">? cores</span>
                            <span className="memSpecValue">?gb</span>
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
