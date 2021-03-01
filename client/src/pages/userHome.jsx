import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SideMenu from "../components/userHome/sideMenu";
import Server from "../components/userHome/server";
import Options from "../components/userHome/options";

import { store } from "../index";
import { fetchUserData, checkUserAuth } from "../redux/actions/index";

const UserHomePage = () => {
  const history = useHistory();
  const [page, setPage] = useState(["server"]);
  const [userData, setUserData] = useState([store.getState()]);
  const [hasAuthCheck, setHasAuthCheck] = useState(false);

  const auth = async () => {
    if (!hasAuthCheck) {
      await store.dispatch(fetchUserData);
      await store.dispatch(checkUserAuth);
      setUserData(store.getState());
      setHasAuthCheck(true);

      console.log("5", userData);

      if (userData.auth !== undefined && !userData.auth) {
        console.log("Not logged in");
        history.push("/");
        window.location.reload();
      }
    }
  };

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

  auth();
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
