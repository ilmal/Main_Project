import { useState, useEffect } from "react"
import { useStore } from "react-redux"
import ReactTooltip from 'react-tooltip';

import refreshData from "./refreshData"

const LogsComponent = () => {
    const store = useStore()
    const [userData, setUserData] = useState(store.getState())
    const [logsExpand, setLogsExpand] = useState(false)

    store.subscribe(() => {
        setUserData(store.getState());
    });

    useEffect(() => {
        // logic for logs interaction
        // making sure the interaction logic on fire when logs is active
        if (userData.serverPods.status === "True") {
            const ele = document.getElementById('logsText');

            ele.style.cursor = 'grab';
            ele.scrollTop = ele.scrollHeight;

            let pos = { top: 0, left: 0, x: 0, y: 0 };

            const mouseDownHandler = function (e) {
                ele.style.cursor = 'grabbing';
                ele.style.userSelect = 'none';

                pos = {
                    left: ele.scrollLeft,
                    top: ele.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                };

                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            };

            const mouseMoveHandler = function (e) {
                // How far the mouse has been moved
                const dx = e.clientX - pos.x;
                const dy = e.clientY - pos.y;

                // Scroll the element
                ele.scrollTop = pos.top - dy;
                ele.scrollLeft = pos.left - dx;
            };

            const mouseUpHandler = function () {
                ele.style.cursor = 'grab';
                ele.style.removeProperty('user-select');

                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            // Attach the handler
            ele.addEventListener('mousedown', mouseDownHandler);
        }
    }, [userData]);

    const expandLogs = () => {
        setLogsExpand(!logsExpand)
        console.log("This is the logsExpand function; ", logsExpand)
    }

    const refreshDataFunc = (e) => {
        refreshData(e, store, userData)
    }

    // ------------- functions for different pods status (default messages) -----------


    const running = () => {
        return (
            <>
                <div className={logsExpand ? "logsMainContainer logsMainContainerHover logsMainContainerExpanded userHomeSegment" : "logsMainContainer logsMainContainerHover userHomeSegment"}>
                    <div className="logsExpandArrow fas fa-expand-arrows-alt" onClick={expandLogs} data-tip data-for="expandLogs" />
                    <div className="logsText" id="logsText">
                        <span>
                            {userData.serverPods.logs}
                            <p></p>
                        </span>
                    </div>
                    <div className="logsTextContainer">
                        <span>Logs</span>
                        <div onClick={refreshDataFunc}>
                            <div className="checkStatus fas fa-sync" data-tip data-for="refreshInfo" />
                        </div>
                    </div>
                </div>
                <ReactTooltip id="refreshInfo" place="bottom" delayShow={100}>
                    <p>Click to refresh logs</p>
                </ReactTooltip>
                <ReactTooltip id="expandLogs" place="bottom" delayShow={100}>
                    <p>Click to expand/minimize logs</p>
                </ReactTooltip>
            </>
        )
    }

    const logsMessageBoiler = (e) => {
        return (
            <>
                <div className="logsMainContainer userHomeSegment">

                    <div className="logsMessageContainer">
                        {e === "shuttingDown" ? <ShuttingDown /> : null}
                        {e === "startingUp" ? <StartingUp /> : null}
                        {e === "queue" ? <Queue /> : null}
                        {e === "notRunning" ? <NotRunning /> : null}
                    </div>
                    <div className="logsTextContainer">
                        <span>Logs</span>
                    </div>
                </div>
            </>
        )
    }

    const ShuttingDown = () => {
        return (
            <div className="logsMessageBanner logsMessageBannerYellow">
                <span>Server shutting down!</span>
            </div>
        )
    }

    const StartingUp = () => {
        return (
            <div className="logsMessageBanner logsMessageBannerYellow">
                <span>Server starting up!</span>
            </div>
        )
    }

    const Queue = () => {
        return (
            <div className="logsMessageBanner logsMessageBannerYellow">
                <span>{userData.serverPods.logs}</span>
            </div>
        )
    }

    const NotRunning = () => {
        return (
            <div className="logsMessageBanner logsMessageBannerRed">
                <span>Server not running!</span>
            </div>
        )
    }

    // ---------------------------------------------------------------------

    // what is displayed in the logs box
    switch (userData.serverPods.status) {
        case "True":
            return running()
        case "False":
            return logsMessageBoiler("shuttingDown")
        case "Pending":
            return logsMessageBoiler("startingUp")
        case "Queuing":
            return logsMessageBoiler("queue")
        case "server not running":
            return logsMessageBoiler("notRunning")
        default:
            return running()
    }
}

export default LogsComponent