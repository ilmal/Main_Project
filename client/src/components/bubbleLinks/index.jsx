import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { store } from "../..";
import InfoPanelUserHome from "../infoPanel/infoPanelUserHome";
import { useState } from "react";
import { useEffect } from "react";

const Bubbles = () => {
    const [infoPanel, setInfoPanel] = useState(false)

    const history = useHistory();

    const clickHandler = (e) => {
        // checking how to hanle click
        const origin = e.target.className
        if (origin.indexOf("helpBubble") > -1) {
            history.push("/message/home");
            window.location.reload();
            return
        }
        if (origin.indexOf("infoBubble") > -1) {
            setInfoPanel(!infoPanel)
            console.log("infoPanel")
            return
        }
        if (origin.indexOf("infoPanelBubbleExitInner") > -1) {
            setInfoPanel(!infoPanel)
            console.log("infoPanel")
            return
        }
        store.dispatch({
            type: "ERR_MESSAGE",
            payload: "Something went wrong while handling your request"
        })
    }

    // enable disable scroll on infopanel
    useEffect(() => {
        if (infoPanel) {
            document.body.style.overflow = "hidden"
        } else if (!infoPanel) {
            document.body.style.overflow = "scroll"
        }
    }, [infoPanel])

    return (
        <>
            <div className="bubbleContainer">
                <div className="defaultBubble helpBubble fas fa-comments" data-tip data-for="SupportBubble" onClick={clickHandler}>
                    <div className="bubbleAlert">
                        <div className="bubbleAlertCenter" />
                    </div>
                </div>
                {window.location.pathname === "/user/home" ? <div className="defaultBubble infoBubble fas fa-exclamation" data-tip data-for="InfoBubble" onClick={clickHandler} /> : null}

                {
                    infoPanel ?
                        <>
                            <div className="infoPanelBlur" onClick={clickHandler} />
                            <div className="infoPanelContainerOuter">
                                <div className="infoPanelContainer">
                                    <div className="infoPanelBubbleConatiner">
                                        <div className="infoPanelBubbleInner">
                                            <div className={
                                                window.location.pathname === "/user/home" ? "infoPanelBubbleInnerUserHome fas fa-exclamation" : null
                                            } />
                                        </div>
                                        <div className="infoPanelBubbleExit">
                                            <div className="infoPanelBubbleExitInner" onClick={clickHandler}>
                                                <span>Exit</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="infoPanelContainerInner">
                                        {window.location.pathname === "/user/home" ? <InfoPanelUserHome /> : null}
                                    </div>
                                </div>
                            </div>
                        </>
                        : null
                }

                {/* <div className="defaultBubble twitterBubble fab fa-twitter" />
            <div className="defaultBubble instagramBubble fab fa-instagram" /> */}
            </div>
            <ReactTooltip id="SupportBubble" delayShow="50">
                <p>Support & Feature requests</p>
            </ReactTooltip>
            <ReactTooltip id="InfoBubble" delayShow="50">
                <p>Info about page</p>
            </ReactTooltip>
        </>
    );
}

export default Bubbles;

