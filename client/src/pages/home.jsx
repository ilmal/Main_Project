import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const list = ["Minecraft", "ARK", "Terraria", "Unturned", "Rust"];

  const [page, changepage] = useState(1)
  const [loadAnimation, changeloadAnimation] = useState(false)
  const [transformUpp, changetransformUpp] = useState(false)
  const [transformDown, changetransformDown] = useState(false)
  const [i, changei] = useState(-1)
  const [gamesAnimation, changeGamesAnimation] = useState(true)

  const history = useHistory();

  const pageUpp = () => {
    page === 1
      ? changepage(page)
      : changepage(page - 1);
  };

  const pageDown = () => {
    page === 2
      ? changepage(page)
      : changepage(page + 1);
  };

  const scrollHandler = (e) => {
    if (e.deltaY > 0) {
      pageDown();
    } else {
      pageUpp();
    }
  };

  const changeGame = () => {
    console.log(i)
    if (i >= list.length - 1) {
      changei(0)
    } else {
      changei(i + 1)
    }
  };


  useEffect(() => {
    setTimeout(() => {
      changeloadAnimation(true)
    }, 50);
    if (gamesAnimation) {
      changeGame()
      changeGamesAnimation(false)
    }
    setTimeout(changeGame, 3000);
  })



  const page1 = () => {
    return (
      <div
        className={
          transformUpp
            ? "homeMainContainerTransform"
            : "homeMainContainer"
        }
        onWheel={scrollHandler}
      >
        <div className="innerContainer">
          <span
            className={
              loadAnimation ? "homeMainSpan" : "homeMainSpanAway"
            }
          >
            Host your own{" "}
            <span className="homeChangeGameSpan">{list[i]}</span>{" "}
            server with <span>U1</span>servers
          </span>
        </div>
        <div
          className="homePageArrow fas fa-angle-double-down"
          onClick={pageDown}
        />
      </div>
    );
  };

  const gameSelect = e => {
    switch (e.target.id) {
      case "minecraftSelector":
        console.log("Woooooo, let's play some minectaft")
        history.push("/server/minecraft/home");
        window.location.reload();
        break;
      default:
        console.log("error with game selection, see homePage.gameSelect")
        break;
    }
  }


  const page2 = () => {
    return (
      <div className="homePage2MainContaiener" onWheel={scrollHandler}>
        <div className="homePage2Title">
          <span>Choose your game</span>
        </div>
        <div id="homePage2Card" className="homePage2Cards">
          <div className="homePage2Card1">
            <div className="whiteBack" id="minecraftSelector" onClick={gameSelect}>
              <div className="textBottom">
                <span>Minecraft</span>
              </div>
            </div>
          </div>
          <div className="homePage2Card2">
            <div className="whiteBack" id="arkSelector">
              <div className="blurPartTop" />
              <div className="comingSoon">
                <span>COMING SOON</span>
              </div>
              <div className="blurPartBottom" />
              <div className="textBottom">
                <span>ARK<p>Survival Evolved</p></span>
              </div>
            </div>
          </div>
          <div className="homePage2Card3">
            <div className="whiteBack" id="rustSelector">
              <div className="blurPartTop" />
              <div className="comingSoon">
                <span>COMING</span>
                <span>SOON</span>
              </div>
              <div className="blurPartBottom" />
              <div className="textBottom">
                <span>RUST</span>
              </div>
            </div>
          </div>
          {/* <div className="homePage2Card4">
            <span>SOON</span>
          </div>
          <div className="homePage2Card5">
            <span>SOON</span>
          </div>
          <div className="homePage2Card6">
            <span>SOON</span>
          </div> */}
        </div>
      </div>
    );
  };

  const errFunc = () => {
    return (
      <div className="homeMainContainer">
        <div className="innerContainer">
          <span className="homePageError">error occured</span>
        </div>
      </div>
    );
  };

  switch (page) {
    case 1:
      return page1();
    case 2:
      return page2();
    default:
      return errFunc();
  }
}

export default HomePage;
