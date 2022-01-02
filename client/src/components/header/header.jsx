import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { store } from "../../index"

const Header = () => {
    const history = useHistory()

    const [userData, setUserData] = useState(store.getState())
    const [hideDemo, setHideDemo] = useState(true)

    const handleClick = (source) => {
        if (source === "userHome") {
            if (store.getState().user.past_servers.length === 0) { // if user doesn't have any servers, throw err
                console.log("THROW ERR")
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: "Please buy a server to access server dashboard"
                })
                return
            }
            history.push("/user/home")
            window.location.reload()
            return
        }
    }

    store.subscribe(() => {
        setUserData(store.getState());
    });

    useEffect(() => {
        if (window.location.pathname === "/") {
            setHideDemo(true)
            setTimeout(() => {
                setHideDemo(true)
            }, 5000)
        }
    }, [])

    return (
        <div className="headerBanner">
            <div className="headerInnerBanner">
                <div >
                    <a href="/" className="homeLink"><span>U1</span>servers</a>
                </div>
                {
                    hideDemo ?
                        null
                        :
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <span style={{ color: "#fff", fontSize: "1.5rem" }}>DEMO BUILD</span>
                            <p style={{ color: "rgba(255, 255, 255, 0.9)", marginTop: "10px", fontSize: "1.2rem" }}>(Please help report any problems with the yellow chat function below!)</p>
                        </div>
                }

                <div>
                    {userData.auth ?
                        <>
                            <a onClick={() => handleClick("userHome")} >{userData.user.name}</a>
                        </>
                        :
                        <>
                            <a href="/user/login">LOGIN</a>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;

