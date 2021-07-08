import { useStore } from "react-redux"
import { useState } from "react"

import TimeUpdate from "./timeUpdate";

const PlayTimeComponent = () => {

    const store = useStore()
    const [userData, setUserData] = useState(store.getState())

    store.subscribe(() => {
        setUserData(store.getState())
    })

    const refreshPlayTimeFunc = () => {
        // cheking if server is running
        if (userData.serverPods.status === "server not running") {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Server is not running, start server to reset time!"
            })
        } else {
            store.dispatch({
                type: "MESSAGE",
                payload: "Resetting play time!"
            })
            TimeUpdate(true, store, userData)
        }
    }

    return (
        <div className="playtimeContainer userHomeSegment">
            <div className="playtimeTitleContainer">
                <span>Play time</span>
            </div>
            <div className="playtimeInfoContainer">
                <div className="playtimeTimeContainer" data-tip data-for="playtimeleft">
                    <div className="playtimetimetime">
                        <span>{userData.serverTIME.timeLeft}</span>
                    </div>
                    <div className="playtimetimedescription">
                        <span>minutes</span>
                    </div>
                </div>
                <div className="playtimeContainerLine" />
                <div className="playtimeBtnContainer">
                    <button onClick={refreshPlayTimeFunc}>Refresh</button>
                </div>
            </div>
        </div>
    )

}

export default PlayTimeComponent