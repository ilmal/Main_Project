import { useState } from "react";

const InfoPaneluserHome = () => {
    const [page, setPage] = useState("overview")

    const overviewPage = () => {
        return (
            <>
                <div className="InfoPaneluserHomeContentTitleContainer">
                    <span>Home Page</span>
                    <div className="InfoPaneluserHomeContentTitleLine" />
                </div>
                <div className="InfoPaneluserHomeContentMainConatiner">
                    <div className="InfoPaneluserHomeContentMainConatinerInner">
                        <div className="InfoPaneluserHomeContentText">
                            <span>Get info about our server features</span>
                        </div>
                        <div className="InfoPaneluserHomeContentArrow">
                            <div className="InfoPaneluserHomeContentArrowBox">

                            </div>
                            <div className="InfoPaneluserHomeContentArrowline">

                            </div>
                        </div>
                    </div>
                    <div className="InfoPaneluserHomeContentMainPageSelectorContainer">
                        <div className="InfoPaneluserHomeArrowLeft">
                            <span>prev</span>
                        </div>
                        <div className="InfoPaneluserHomeArrowLine"></div>
                        <div className="InfoPaneluserHomeArrowRight">
                            <span>next</span>
                        </div>
                        <div className="InfoPaneluserHomeArrowChangeColor" />
                    </div>
                </div>
            </>
        )
    }

    const playTimePage = () => {
        return (
            <>
                <div className="InfoPaneluserHomeContentTitleContainer">

                </div>
                <div className="InfoPaneluserHomeContentMainConatiner">
                    <div className="InfoPaneluserHomeContentMainConatinerInner">

                    </div>
                </div>
            </>
        )
    }

    const content = () => {
        switch (page) {
            case "overview":
                return overviewPage()
            case "playTime":
                return playTimePage()
            default:
                return overviewPage()
        }
    }

    const handleClick = (e) => {
        setPage(e.target.id)
    }

    return (
        <div className="InfoPaneluserHomeContainer">
            <div className="InfoPaneluserHomeMenuContainer">
                <div className="InfoPaneluserHomeMenuContainerInner">
                    <p>MENU</p>
                    <div className="InfoPaneluserHomeMenuLine" />
                    <span id="overview" onClick={handleClick}>Overview</span>
                    <span id="createServer" style={{ color: "rgba(255,255,255,0.25)" }}>Creating a server</span>
                    <span id="logs" style={{ color: "rgba(255,255,255,0.25)" }}>Logs</span>
                    <span id="playTime" onClick={handleClick}>Play time</span>
                    <span id="serverSettings" style={{ color: "rgba(255,255,255,0.25)" }}>Changing server settings</span>
                    <span id="userSettings" style={{ color: "rgba(255,255,255,0.25)" }}>Changing user settings</span>
                </div>
            </div>
            <div className="InfoPaneluserHomeContentContainer">
                {content()}
            </div>
        </div>
    )
}

export default InfoPaneluserHome