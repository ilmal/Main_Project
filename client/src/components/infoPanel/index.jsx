import { useEffect, useState } from "react";
import store from "../../store";
import InfoPanelUserHome from "./infoPanelUserHome"


const infoPanel = () => {

    const [url, setUrl] = useState(window.location.pathname)

    useEffect(() => {
        setUrl(window.location.pathname)
    }), []



    switch (url) {
        case "/user/home":
            console.log("displaying the info panel for the url: /user/home")
            return InfoPanelUserHome

        default:
            console.log("err with url not recognized at the infopanel (src/components/infoPanel/index.jsx)")
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "Something went wrong with the infoPanel"
            })
            break;
    }
}