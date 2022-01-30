import ChangeServerConfig from "./server/changeServerConfig";
import LogsComponent from "./server/logsComponent"
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from 'react-tooltip';

import store from "../../store";
import { serverPodsInfo, serverDataRefresh } from "../../redux/actions"

import refreshData from "./server/refreshData";
import StartStop from "./server/startStop";

//images
import minecraftImage from "../../images/userHomeImages/minecraftServerLandingPage.jpg"


const Server = () => {
  const [showLandingPage, setShowLandingPage] = useState(true)
  const [update, setUpdate] = useState(false)
  const [statusDupe, setStatusDupe] = useState(false)

  const history = useHistory();

  store.subscribe(() => {
    setUpdate(!update)
  })

  useEffect(() => {
    setTimeout(() => {
      // updating logs
      if (statusDupe) return
      setStatusDupe(true)
      store.dispatch(serverPodsInfo)
    }, 5000);
    setStatusDupe(false)
  }, [statusDupe])

  useEffect(() => {

    // changing layout to fit server and layout
    const layoutElement = document.getElementById("random03242jcmvmj0v23cm4")
    if (store.getState().userHomeData.showServerLandingPage && store.getState().user.past_servers.length > 1) {
      layoutElement.style.gridTemplateRows = "auto"
    } else {
      layoutElement.style.gridTemplateRows = " auto repeat(7, 11% 3%)"
      layoutElement.style.maxHeight = "110vh"
    }
  })


  const serverStatus = (e) => {
    switch (store.getState().serverPods.status) {
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
    if (store.getState().serverPods.status !== "server not running") {
      return <span>mc.servers.u1.se:{store.getState().serverSVC.port ? store.getState().serverSVC.port : null}</span>
    } else {
      return <span>----</span>
    }
  }

  const copyText = (e) => {
    navigator.clipboard.writeText(e.target.innerText)
  }

  const refreshDataFunc = (e) => {
    refreshData(e)
  }

  const startStopFunc = (e) => {
    StartStop(e.target.id, store)
  }

  const positionCalculator = (returnArray) => {
    let start, end

    //calculating the grid placement
    start = (4 * (returnArray.length + 1)) + 3
    end = start - 3

    const row = start.toString() + "/" + end.toString()
    return ({
      gridColumn: "3/7",
      gridRow: row
    })
  }

  /*
    -------------------------LANDING PAGE--------------------------------
  */

  const landingPageFunc = () => {
    let returnArray = []

    // logic for choosing image dependant on the game
    const serverImageSelectorFunc = () => {
      switch ("minecraft") {
        case "minecraft":
          return (
            <img src={minecraftImage} alt="minecraft image" />
          )
        default:
          break;
      }
    }

    //template for the server block showing servers
    const serverBlock = (returnArray, key, element) => {
      const handleCLick = async (e) => {
        setShowLandingPage(false)
        console.log("E.TARGET.ID: ", e)
        document.cookie = `selectedServer=${e}`
        // refresh server data to the new server index
        await store.dispatch(serverDataRefresh)
        store.dispatch({
          type: "USER_HOME_DATA",
          payload: {
            ...store.getState().userHomeData,
            serverIndex: e,
            showServerLandingPage: false
          }
        })
      }
      const orderDate = new Date(element.date)
      const endDate = orderDate.setDate(orderDate.getDate() + 30)
      let timeLeft = (endDate - new Date()) / (1000 * 60 * 60 * 24)
      timeLeft = timeLeft.toString().split(".")
      timeLeft = timeLeft[0]
      return (
        <div key={key.toString()} className="userHomeServerBlockMainContainer" style={positionCalculator(returnArray)} onClick={() => handleCLick(key)}>
          <div className="userHomeServerBlockImageBack">
            {serverImageSelectorFunc()}
          </div>
          <div className="userHomeServerBlockInfoContainer" id={key}>
            <div className="userHomeServerBlockInfoGameNameContainer">
              <span className="userHomeServerBlockInfoGameName">{element.game.charAt(0).toUpperCase() + element.game.slice(1)}</span>
            </div>
            <div className="userHomeServerBlockInfoGameNameSeperationLine" />
            <span className={"userHomeServerBlockInfoGamePlan" + " " + "userHomeServerBlockInfoGamePlan" + element.plan}>{element.plan}</span>
            <span className="userHomeServerBlockInfoTimeLeft"> <p>Days left: </p>{timeLeft}</span>
          </div>
        </div>
      )
    }
    // the text block shown at the end of the server list
    const redirectTextBlock = (returnArray) => {
      return (
        <div key="redirectTextBlockKey" style={positionCalculator(returnArray)}>
          <span className="userHomeServerBlockSpecialText">Need another server? Head on over to the <span onClick={() => { history.push("/"); window.location.reload() }}> MAIN PAGE </span></span>
        </div>
      )
    }

    if (store.getState().user) store.getState().user.servers.forEach((element, index) => {
      returnArray.push(serverBlock(returnArray, index, element))
    })
    returnArray.push(redirectTextBlock(returnArray))
    return returnArray
  }

  // showing start page with server panel where user chooses server and or is redirected to buy server
  if (store.getState().userHomeData.showServerLandingPage && store.getState().user.past_servers.length > 1) {
    return (
      <>
        <span className="userHomeLandingPageHeader">Select your server</span>
        {
          landingPageFunc()
        }
      </>
    )
  }
  // check for user auth, if case show page, else send to main page
  if (!(document.cookie.search("loginAuth") > -1)) {
    console.log("User no auth")
    history.push("/");
    return null;
  }
  return (
    <>
      <div className="userHomeServerName">
        <span>{store.getState().serverInfo[store.getState().userHomeData.serverIndex].data[4].value.split("Server")[0].split("")[0].toUpperCase() + store.getState().serverInfo[store.getState().userHomeData.serverIndex].data[4].value.split("Server")[0].slice(1)} Server</span>
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

      <ChangeServerConfig serverIndex={store.getState().userHomeData.serverIndex} />
      <LogsComponent />

      <ReactTooltip id="copyServerAddress" delayShow={100}>
        <p>Click to copy</p>
      </ReactTooltip>
      <ReactTooltip id="playtimeleft" place="top" delayShow={20}>
        <p>play time remaining</p>
      </ReactTooltip>
    </>
  );
};

export default Server;
