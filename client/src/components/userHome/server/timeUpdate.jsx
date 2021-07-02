import { serverTimeInfo } from "../../../redux/actions"
import StartStop from "./startStop";


const TimeUpdate = async (timeReset, store, userData) => {

    await serverTimeInfo(store.dispatch, timeReset, userData.serverTIME.timeOfReset)

    // setting time left to 0 if server is not runnig and time still hasn't run out
    if (userData.serverPods.status === "server not running" && userData.serverTIME.timeLeft > 0) {
        console.log("reseting time to 0")
        store.dispatch({
            "type": "SERVER_TIME_DATA",
            "payload": {
                timeLeft: 0
            }
        })
    }

    //  shutting down server if shutdown variable is true, and server is runnig
    if (userData.serverTIME.serverShutDown && userData.serverPods.status === "True") {
        StartStop("stopServer", store)
    }
}

export default TimeUpdate