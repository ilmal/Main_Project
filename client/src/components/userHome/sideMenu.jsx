import store from "../../store";

const SideMenu = () => {
  const server = () => {
    store.dispatch({
      type: "USER_HOME_DATA",
      payload: {
        ...store.getState().userHomeData,
        sideMenuSelectedTab: "server",
        showServerLandingPage: true
      }
    })
  };

  const options = () => {
    store.dispatch({
      type: "USER_HOME_DATA",
      payload: {
        ...store.getState().userHomeData,
        sideMenuSelectedTab: "options"
      }
    })
  };

  return (
    <div className="userHomeSideMenuLayout">
      <div className="userHomeSideMenuUName">
        <h1>{store.getState().user.name.charAt(0).toUpperCase() + store.getState().user.name.slice(1)}</h1>
        <div className="userHomeSideMenuUNameLine" />
      </div>
      <div className="userHomeSideMenuOptions userHomeSideMenuOptionsServer">
        <span onClick={server} className={store.getState().userHomeData.sideMenuSelectedTab === "server" ? "active" : null}>Server</span>
      </div>
      <div className="userHomeSideMenuOptions userHomeSideMenuOptionsOptions">
        <span onClick={options} className={store.getState().userHomeData.sideMenuSelectedTab === "options" ? "active" : null}>Options</span>
      </div>
    </div>
  );
};

export default SideMenu;
