import { store } from "../../index";
import { useState } from "react";

const SideMenu = (props) => {

  const [userData, updateUserData] = useState(store.getState());
  const [menu, setMenu] = useState("server")

  const server = () => {
    props.setState("server");
    setMenu("server")
    console.log(menu)
  };

  const options = () => {
    props.setState("options");
    setMenu("options")
    console.log(menu)
  };

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
        <span onClick={server} className={menu === "server" ? "active" : null}>Server</span>
      </div>
      <div className="userHomeSideMenuOptions userHomeSideMenuOptionsOptions">
        <span onClick={options} className={menu === "options" ? "active" : null}>Options</span>
      </div>
    </div>
  );
};

export default SideMenu;
