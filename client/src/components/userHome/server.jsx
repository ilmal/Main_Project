import ChangeServerConfig from "./changeServerConfig";
import { useState } from "react";

import { store } from "../../index";
import { startServer, stopServer } from "../../redux/actions/index"

const Server = () => {
  const [userData, updateUserData] = useState(store.getState());

  store.subscribe(() => {
    updateUserData(store.getState());
  });

  const startStop = (e) => {
    if (e.target.className === "innerDivStart") {
      console.log("u said start?")
      store.dispatch(startServer)
    } else if (e.target.className === "innerDivStop") {
      console.log("u said stop?")
      store.dispatch(stopServer)
    }
  }

  const serverStatus = (e)=>{

    switch (userData.server.status) {
      case "True":
        return <div className="runningDiv defaultDiv"><p className="running">Running</p></div>  
      case "False": 
        return <div className="closingDiv defaultDiv"><p className="closing">Shutting Down</p></div>
      default:
        return <div className="closedDiv defaultDiv"><p className="closed">Closed</p></div> 
    }
  }

  return (
    <>
      <div className="userHomeServerName">
        <span>{userData.user.name}</span>
      </div>
      <div className="userHomeSegment userHomeStatusOfServer">
        {serverStatus()}
        <div>
          <span>1h 55min</span>
        </div>
      </div>
      <div className="userHomeSegment suerhomeStartStopServer">
        <div className="innerDivStart" onClick={startStop}>
          <span className="userHomestart">Start</span>
        </div>
        <div className="innerDivStop" onClick={startStop}>
          <span className="userHomestop">Stop</span>
        </div>
        <div id="random23894723">
          <div className="userHomeLineBetweenStartStop" />
        </div>
      </div>
      <div className="userHomeSegment userHomeIpAdress">
        <p>Server Adress:</p>
        <span>192.168.1.247</span>
      </div>
      <ChangeServerConfig />
    </>
  );
};

export default Server;
