import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SideMenu from "../components/userHome/sideMenu";
import Server from "../components/userHome/server";
import Options from "../components/userHome/options";

import { store } from "../index";
import { serverPodsInfo } from "../redux/actions/"

const UserHomePage = () => {
  const history = useHistory();
  const [page, setPage] = useState(["server"]);
  const [userData, setUserData] = useState([store.getState()]);

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {

    // //autorefresh logs
    // if (store.getState().serverPods.status != "server not running") {
    //   setTimeout(() => {
    //     store.dispatch(serverPodsInfo)
    //     console.log("hello!")
    //     setRemount(!remount)
    //   }, 50000);
    // }

    setDidMount(true);
    return () => setDidMount(false);
  })

  if (!didMount) {
    return null;
  }

  store.subscribe(() => {
    setUserData(store.getState());
    if (store.getState().auth !== null && !store.getState().auth) {
      console.log("Not logged in");
      history.push("/");
      window.location.reload();
    }
  });

  const changeState = (data) => {
    setPage(data);
  };

  const getPage = () => {
    let component;
    switch (page) {
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
    <dir className="userHomeLayout">
      <dir className="userHomesideMenu">
        <SideMenu setState={changeState} />
      </dir>
      {getPage()}
    </dir>
  );
};

export default UserHomePage;
