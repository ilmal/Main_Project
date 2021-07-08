import { StartServer, StopServer } from "../../../redux/actions/index"

const StartStop = (command, store) => {

    if (command === "startServer") {
        console.log("u said start?")
        store.dispatch(StartServer)
        store.dispatch({
            type: "MESSAGE",
            payload: "Server starting up!"
        })
    } else if (command === "stopServer") {
        console.log("u said stop?")
        store.dispatch(StopServer)
        store.dispatch({
            type: "MESSAGE",
            payload: "Server shutting down!"
        })
    }
}

export default StartStop