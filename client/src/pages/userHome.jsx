import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SideMenu from "../components/userHome/sideMenu";
import Server from "../components/userHome/server";
import Options from "../components/userHome/options";

import store from "../store";
import loadBaseData from "../components/loadBaseData";

const UserHomePage = () => {
  const history = useHistory();
  const [userData, setUserData] = useState([store.getState()]);

  const [didMount, setDidMount] = useState(false);

  useEffect(async () => {

    //adding userHomeData to redux store
    store.dispatch({
      type: "USER_HOME_DATA",
      payload: {
        serverIndex: 0,
        sideMenuSelectedTab: "server",
        showServerLandingPage: true
      }
    })

    //checking if user is logged in, if not, send to home page
    if (!store.getState().auth) {
      console.log("Not logged in");
      history.push("/");
      window.location.reload();
    }

    // updating state
    await loadBaseData()

    setDidMount(true);
    return () => setDidMount(false);
  }, [])

  if (!didMount) {
    return null;
  }

  // subscribing to state updates
  store.subscribe(() => {
    setUserData(store.getState());
  });

  const getPage = () => {
    let component;
    switch (store.getState().userHomeData.sideMenuSelectedTab) {
      case "server":
        component = <Server userData={userData} />;
        break;
      case "options":
        component = <Options userData={userData} />;
        break;
      default:
        component = <Server userData={userData} />;
        break;
    }
    return component;
  };

  //auth();
  return (
    <div className="userHomeLayout" id="random03242jcmvmj0v23cm4">
      <div className="userHomesideMenu">
        <SideMenu />
      </div>
      {getPage()}
    </div>
  );
};

export default UserHomePage;
