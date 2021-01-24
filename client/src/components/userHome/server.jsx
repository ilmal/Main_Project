import ChangeServerConfig from "./changeServerConfig"
import { useState } from "react"

const Server = (props)=>{
    
    return(
        <>
            <div className="userHomeServerName">
                <span>NameOfServer</span>
            </div>
            <div className="userHomeSegment userHomeStatusOfServer">
                <div id="random30489"> 
                    <p>Running</p>
                </div>
                <div>
                    <span>1h 55min</span>
                </div>

            </div>
            <div className="userHomeSegment suerhomeStartStopServer">
                <div className="innerDivStart">   
                    <span className="userHomestart">Start</span>
                </div>
                <div className="innerDivStop">
                    <span className="userHomestop">Stop</span>
                </div>
                <div id="random23894723">
                    <div className="userHomeLineBetweenStartStop"/>
                </div>
            </div>
            <div className="userHomeSegment userHomeIpAdress">
                <p>Server Adress:</p>
                <span>192.168.1.247</span>
            </div>
            <ChangeServerConfig/>
        </>
    );
}

export default Server;