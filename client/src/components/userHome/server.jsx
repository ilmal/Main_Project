import ChangeServerConfig from "./server/changeServerConfig";
import LogsComponent from "./server/logsComponent"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

import { store } from "../../index";
import { serverPodsInfo } from "../../redux/actions"

import refreshData from "./server/refreshData";
import StartStop from "./server/startStop";
import PlayTimeComponent from "./server/playTime";
import TimeUpdate from "./server/timeUpdate";


const Server = () => {
  const [userData, updateUserData] = useState(store.getState());
  const [initialLoad, setInitialLoad] = useState(true)

  const history = useHistory();

  store.subscribe(() => {
    updateUserData(store.getState());
  });

  useEffect(() => {
    // refresh logs if status isn't "server not running"
    if (store.getState().serverPods.status != "server not running") {
      const interval = setInterval(() => {

        // updating logs
        store.dispatch(serverPodsInfo)
        // updating plsytime left needs: timeReset, store, userData
        TimeUpdate(false, store, userData)
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [userData])

  useEffect(() => {
    if (initialLoad) {
      store.dispatch(serverPodsInfo)
      TimeUpdate(false, store, userData)
      setInitialLoad(false)
    }
  }, [initialLoad])



  const serverStatus = (e) => {
    switch (userData.serverPods.status) {
      case "True":
        return <div className="runningDiv defaultDiv"><p className="running">Running</p></div>
      case "False":
        return <div className="closingDiv defaultDiv"><p className="closing">Shutting Down</p></div>
      case "Pending":
        return <div className="closingDiv defaultDiv"><p className="closing">Starting up</p></div>
      case "Queuing":
        return <div className="closingDiv defaultDiv"><p className="closing">Queuing for server</p></div>
      case "server not running":
        return <div className="closedDiv defaultDiv"><p className="closed">Not Running</p></div>
      default:
        return <div className="closedDiv defaultDiv"><p className="closed">ERROR OCCURED</p></div>
    }
  }
  const serverIP = () => {
    if (userData.serverPods.status !== "server not running") {
      return <span>mc.servers.u1.se:{userData.serverSVC.port}</span>
    } else {
      return <span>----</span>
    }
  }

  const copyText = (e) => {
    navigator.clipboard.writeText(e.target.innerText)
  }

  const refreshDataFunc = (e) => {
    refreshData(e, store, userData)
  }

  const startStopFunc = (e) => {
    StartStop(e.target.id, store)
  }

  if (document.cookie.search("loginAuth") > -1) {
    return (
      <>
        <div className="userHomeServerName">
          <span>{userData.env[4].value}</span>
        </div>
        <div className="userHomeSegment userHomeStatusOfServer">
          {serverStatus()}
          <div className="checkStatus fas fa-sync" onClick={refreshDataFunc} data-tip data-for="refreshInfo">
            <span>Check Status</span>
          </div>
        </div>
        <div className="userHomeSegment suerhomeStartStopServer">
          <div className="innerDivStart" id="startServer" onClick={startStopFunc}>
            <span className="userHomestart">Start</span>
          </div>
          <div className="innerDivStop" id="stopServer" onClick={startStopFunc}>
            <span className="userHomestop">Stop</span>
          </div>
          <div id="random23894723">
            <div className="userHomeLineBetweenStartStop" />
          </div>
        </div>
        <div className="userHomeSegment userHomeIpAdress">
          <p>Server IP:</p>
          <span data-tip data-for="copyServerAddress" onClick={copyText}>{serverIP()}</span>
        </div>

        <ChangeServerConfig />
        <LogsComponent />
        <PlayTimeComponent />

        <ReactTooltip id="copyServerAddress" delayShow={100}>
          <p>Click to copy</p>
        </ReactTooltip>
        <ReactTooltip id="playtimeleft" place="top" delayShow={20}>
          <p>play time remaining</p>
        </ReactTooltip>
      </>
    );
  } else {
    console.log("User no auth")
    history.push("/");
    return null;
  }
};

export default Server;
