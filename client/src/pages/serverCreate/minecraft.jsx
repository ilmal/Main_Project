import React, { Component } from "react";
import axios from "axios";

const MinecraftCreate = () => {

    return (
        <div className="minecraftBody">
            <span>Choose your Minecraft Server!</span>
            <div className="container">
                <div className="minecraftCards basic">
                    <div className="titleContainer basicTitleContainer">
                        <span>BASIC</span>
                    </div>
                </div>
                <div className="minecraftCards normal">
                    <div className="titleContainer normalTitleContainer">
                        <span>NORMAL</span>
                    </div>

                </div>
                <div className="minecraftCards advanced">
                    <div className="titleContainer premiumTitleContainer">
                        <span>PREMIUM</span>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default MinecraftCreate;
