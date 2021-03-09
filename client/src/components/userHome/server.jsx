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

  return (
    <>
      <div className="userHomeServerName">
        <span>{userData.user.name}</span>
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
