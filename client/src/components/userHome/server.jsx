import ChangeServerConfig from "./changeServerConfig";
import { useState } from "react";

import { store } from "../../index";
import { fetchUserData, serverPodsInfo, serverSVCInfo, mcConfGetData } from "../../redux/actions"
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
      store.dispatch({
        type: "MESSAGE",
        payload: "Server starting up!"
      })
    } else if (e.target.className === "innerDivStop") {
      console.log("u said stop?")
      store.dispatch(stopServer)
      store.dispatch({
        type: "MESSAGE",
        payload: "Server shutting down!"
      })
    }
  }

  const serverStatus = (e) => {

    switch (userData.serverPods.status) {
      case "True":
        return <div className="runningDiv defaultDiv"><p className="running">Running</p></div>
      case "False":
        return <div className="closingDiv defaultDiv"><p className="closing">Shutting Down</p></div>
      case "Pending":
        return <div className="closingDiv defaultDiv"><p className="closing">Starting up</p></div>
      case "server not running":
        return <div className="closedDiv defaultDiv"><p className="closed">Not Running</p></div>
      default:
        return <div className="closedDiv defaultDiv"><p className="closed">ERROR OCCURED</p></div>
    }
  }
  const serverIP = () => {
    if (userData.serverPods.status !== "server not running") {
      return <span>nils.u1.se:{userData.serverSVC.port}</span>
    } else {
      return <span>----</span>
    }
  }
  const refreshData = () => {
    store.dispatch(fetchUserData)
    store.dispatch(serverPodsInfo)
    store.dispatch(serverSVCInfo)
    store.dispatch(mcConfGetData)
  }

  return (
    <>
      <div className="userHomeServerName">
        <span>{userData.user.name}</span>
      </div>
      <div className="userHomeSegment userHomeStatusOfServer">
        {serverStatus()}
        <div className="checkStatus fas fa-sync" onClick={refreshData}>
          <span>Check Status</span>
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
        {serverIP()}
      </div>
      <ChangeServerConfig />
    </>
  );
};

export default Server;
