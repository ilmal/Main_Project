import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { animateScroll as scroll, scroller } from 'react-scroll'
import { store } from "../index"

const HomePage = () => {
  const [loadAnimation, changeloadAnimation] = useState(false)
  const [i, changei] = useState(-1)
  const [gamesAnimation, changeGamesAnimation] = useState(true)
  const [offset, setOffset] = useState(0)

  const list = ["Minecraft", "ARK", "Terraria", "Unturned", "Rust"];

  const history = useHistory();

  const changeColorArrowDown = (e) => {
    if (e) {
      console.log("changing to white")
      document.getElementById("random9034872m1f7539405").style.color = "#fff"
      document.getElementById("random9034872m1f7539405").style.opacity = "0.7"
      document.getElementById("randomf384ur4398fh34pf").style.backgroundColor = "#fff"
      document.getElementById("random9034872m1f7539405").style.opacity = "0.7"
    } else {
      console.log("changing to dark")
      document.getElementById("random9034872m1f7539405").style.color = "#141618"
      document.getElementById("randomf384ur4398fh34pf").style.backgroundColor = "#141618"
    }
  }


  useEffect(() => {
    const changeGame = () => {
      if (i >= list.length - 1) {
        changei(0)
      } else {
        changei(i + 1)
      }
    };
    setTimeout(() => {
      changeloadAnimation(true)
    }, 50);
    if (gamesAnimation) {
      changeGame()
      changeGamesAnimation(false)
    }
    setTimeout(changeGame, 3000);

    window.onscroll = () => {
      if (window.pageYOffset < 0) {
        return
      }
      if (offset > window.pageYOffset) {
        console.log("scroll up")
        scroll.scrollToTop({
          duration: 300,
          smooth: "easeOutQuad",
        })
        changeColorArrowDown(true)
      } else if (offset < window.pageYOffset) {
        console.log("scroll down")
        scroller.scrollTo("section2", {
          duration: 300,
          smooth: "easeOutQuad",
          offset: 500
        })
        changeColorArrowDown(false)
      }
      setOffset(window.pageYOffset)
    }

    // check for referals. If referal is found, add to cookie for later use
    if (store.getState().querySelectors.ref) {
      document.cookie = `ref=${store.getState().querySelectors.ref}`
    }

  }, [gamesAnimation, offset, i])

  const gameSelect = e => {
    switch (e.target.id) {
      case "minecraftSelector":
        localStorage.removeItem("isCardPressed")
        history.push("/server/minecraft");
        window.location.reload();
        break;
      default:
        console.log("error with game selection, see homePage.gameSelect")
        break;
    }
  }

  const scrollToPage2 = () => {
    scroller.scrollTo("section2", {
      duration: 300,
      smooth: "easeOutQuad",
      offset: 500
    })
  }

  return (
    <>
      <div id="section1">
        <div className="homeMainContainer">
          <div className="innerContainer">
            <span
              className={
                loadAnimation ? "homeMainSpan" : "homeMainSpanAway"
              }
            >
              Host your own{" "}
              <span className="homeChangeGameSpan nav-item">{list[i]}</span>{" "}
              server with <span>U1</span>servers
            </span>
          </div>
        </div>
      </div>
      <div className="homePage2MainContaiener" id="section2">
        <div className="homePage2TopPart">
          <div className="homePage2arrowDown">
            {/* <div className="homePage2ArrowBall" onClick={scrollToPage2}>
              <div className="homePage2ArrowBallInner">
                <div className="homePage2ArrowBallInnerRectangle" />
                <div className="homePage2ArrowBallInnerTriangle" />
              </div>
            </div> */}
            <div className="homePage2ArrowdownText">
              <span onClick={scrollToPage2} id="random9034872m1f7539405">SCROLL</span>
            </div>
            <div className="homePage2ArrowStick" id="randomf384ur4398fh34pf" />
          </div>
        </div>
        <div className="homePage2Background" />
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
        </div>
      </div>
    </>
  );
}

export default HomePage;
