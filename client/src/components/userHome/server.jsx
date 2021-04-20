import ChangeServerConfig from "./changeServerConfig";
import { useState, useEffect, useRef } from "react";

import { store } from "../../index";
import { fetchUserData, serverPodsInfo, serverSVCInfo, mcConfGetData } from "../../redux/actions"
import { startServer, stopServer } from "../../redux/actions/index"

const Server = () => {
  const [userData, updateUserData] = useState(store.getState());
  const [logsExpand, setLogsExpand] = useState(false)

  store.subscribe(() => {
    updateUserData(store.getState());
  });

  useEffect(() => {
    const ele = document.getElementById('logsText');
    ele.scrollTop = ele.scrollHeight;
  }, [userData])

  useEffect(() => {
    const ele = document.getElementById('logsText');
    ele.style.cursor = 'grab';

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
  }, []);

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
  const refreshData = (e) => {
    store.dispatch(fetchUserData)
    store.dispatch(serverPodsInfo)
    store.dispatch(serverSVCInfo)
    store.dispatch(mcConfGetData)
    console.log(e.target.className)
    document.getElementById(e.target.id).classList.add("spinAnimation")
    setTimeout(() => {
      document.getElementById(e.target.id).classList.remove("spinAnimation")
    }, 1000)
    console.log(userData.serverPods.logs)
  }

  const expandLogs = () => {
    setLogsExpand(!logsExpand)
    console.log("This is the logsExpand function; ", logsExpand)
  }

  return (
    <>
      <div className="userHomeServerName">
        <span>{userData.env[4].value}</span>
      </div>
      <div className="userHomeSegment userHomeStatusOfServer">
        {serverStatus()}
        <div className="checkStatus fas fa-sync" id="checkStatus" onClick={refreshData}>
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
      <div className={logsExpand ? "logsMainContainer logsMainContainerExpanded userHomeSegment" : "logsMainContainer userHomeSegment"}>
        <div className="logsExpandArrow fas fa-expand-arrows-alt" onClick={expandLogs} />
        <div className="logsText" id="logsText">
          <span>
            {userData.serverPods.logs}
            <p></p>
          </span>
        </div>
        <div className="logsTextContainer">
          <span>Logs</span>
          <div onClick={refreshData}>
            <div className="checkStatus fas fa-sync" id="checkStatus" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Server;
