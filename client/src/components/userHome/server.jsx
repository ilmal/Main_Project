import ChangeServerConfig from "./changeServerConfig"

const Server = (props)=>{

    return(
        <>
            <div className="userHomeServerName">
                <h1>NilsServer</h1>
            </div>
            <div className="userHomeSegment userHomeStatusOfServer">
                <span>Running</span>
            </div>
            <div className="userHomeSegment suerhomeStartStopServer">
                <span className="userHomestart">Start</span>
                <div className="userHomeLineBetweenStartStop" />
                <span className="userHomestop">Stop</span>
            </div>
            <div className="userHomeSegment userHomeIpAdress">
                <span>192.168.1.247</span>
            </div>
            <ChangeServerConfig/>
        </>
    );
}

export default Server;