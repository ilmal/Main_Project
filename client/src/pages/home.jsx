import React, { Component } from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loadAnimation: false,
      transformUpp: false,
      transformDown: false,
      games: "Minecraft",
      i: 0,
    };
  }

  pageUpp = () => {
    console.log(this.state.page);
    this.state.page === 1
      ? this.setState({ page: this.state.page })
      : this.setState({ page: this.state.page - 1 });
  };

  pageDown = () => {
    console.log(this.state.page);
    this.state.page === 2
      ? this.setState({ page: this.state.page })
      : this.setState({ page: this.state.page + 1 });
  };

  scrollHandler = (e) => {
    console.log("userScrolled", e.deltaY);
    if (e.deltaY > 0) {
      this.pageDown();
    } else {
      this.pageUpp();
    }
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadAnimation: true });
    }, 50);

    const changeGame = () => {
      const list = ["Minecraft", "ARK", "Terraria", "Unturned", "Rust"];
      this.setState({ games: list[this.state.i] });
      this.setState({ i: this.state.i + 1 });
      console.log(list[this.state.i]);
      if (this.state.i === list.length) {
        this.setState({ i: 0 });
      }
      setTimeout(changeGame, 3000);
    };
    changeGame();
  }

  page1 = () => {
    return (
      <div
        className={
          this.state.transformUpp
            ? "homeMainContainerTransform"
            : "homeMainContainer"
        }
        onWheel={this.scrollHandler}
      >
        <div className="innerContainer">
          <span
            className={
              this.state.loadAnimation ? "homeMainSpan" : "homeMainSpanAway"
            }
          >
            Get your{" "}
            <span className="homeChangeGameSpan">{this.state.games}</span>{" "}
            server from U1Servers
          </span>
        </div>
        <div
          className="homePageArrow fas fa-angle-double-down"
          onClick={this.pageDown}
        />
      </div>
    );
  };

  page2 = () => {
    return (
      <div className="homePage2MainContaiener" onWheel={this.scrollHandler}>
        <div className="homePage2Title">
          <span>Choose your game</span>
        </div>
        <div className="homePage2Card">
          <div className="homePage2Card1">
            <span>Ark</span>
          </div>
          <div className="homePage2Card2">
            <span>Minecraft</span>
          </div>
          <div className="homePage2Card3">
            <span>Terraria</span>
          </div>
        </div>
      </div>
    );
  };

  errFunc = () => {
    return (
      <div className="homeMainContainer">
        <div className="innerContainer">
          <span className="homePageError">error occured</span>
        </div>
      </div>
    );
  };

  render() {
    switch (this.state.page) {
      case 1:
        return this.page1();
      case 2:
        return this.page2();
      default:
        return this.errFunc();
    }
  }
}

export default HomePage;
