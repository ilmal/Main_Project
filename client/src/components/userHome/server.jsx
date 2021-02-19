import ChangeServerConfig from "./changeServerConfig"
import { useState } from "react"

import { store } from "../../index"


const Server = (props)=>{
    
    const [userData, updateUserData] = useState(store.getState())

    store.subscribe(()=>{
        updateUserData(store.getState())
    })

    console.log("2",userData.fetchUserData.user.data)

    return(
        <>
            <div className="userHomeServerName">
                <span>{userData.fetchUserData.user.data}</span>
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