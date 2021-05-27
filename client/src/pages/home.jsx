import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const HomePage = () => {
  const list = ["Minecraft", "ARK", "Terraria", "Unturned", "Rust"];

  const [loadAnimation, changeloadAnimation] = useState(false)
  const [i, changei] = useState(-1)
  const [gamesAnimation, changeGamesAnimation] = useState(true)
  const [scrolling, setScrolling] = useState(false)
  const [offset, setOffset] = useState(0)

  const history = useHistory();

  const changeGame = () => {
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

    window.onscroll = () => {
      // console.log("offset: ", offset, "window.pageYOffset", window.pageYOffset)
      if (window.pageYOffset < 0) {
        return
      }
      if (offset > window.pageYOffset) {
        console.log("scroll up")
        scroll.scrollToTop({
          duration: 300,
          smooth: "easeOutQuad",
        })
      } else if (offset < window.pageYOffset) {
        console.log("scroll down")
        scroller.scrollTo("section2", {
          duration: 300,
          smooth: "easeOutQuad",
          offset: 500
        })
      }
      setOffset(window.pageYOffset)
    }
  })

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
            <div className="homePage2ArrowBall" onClick={scrollToPage2}>
              <div className="homePage2ArrowBallInner">
                <div className="homePage2ArrowBallInnerRectangle" />
                <div className="homePage2ArrowBallInnerTriangle" />
              </div>
            </div>
            <div className="homePage2ArrowStick" />
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
