import { store } from "../../index";
import { useState } from "react";

const SideMenu = (props) => {
  const server = () => {
    props.setState("server");
  };

  const options = () => {
    props.setState("options");
  };

  const [userData, updateUserData] = useState(store.getState());

  store.subscribe(() => {
    updateUserData(store.getState());
  });

  return (
    <div className="userHomeSideMenuLayout">
      <div className="userHomeSideMenuUName">
        <h1>{userData.user.name}</h1>
        <div className="userHomeSideMenuUNameLine" />
      </div>
      <div className="userHomeSideMenuOptions userHomeSideMenuOptionsServer">
        <span onClick={server}>Server</span>
      </div>
      <div className="userHomeSideMenuOptions userHomeSideMenuOptionsOptions">
        <span onClick={options}>Options</span>
      </div>
    </div>
  );
};

export default SideMenu;
