import React, { useState } from 'react';
import { useEffect } from 'react';
import { store } from "../../index"

const Header = () => {

    const [userData, setUserData] = useState(store.getState())
    const [hideDemo, setHideDemo] = useState(true)

    store.subscribe(() => {
        setUserData(store.getState());
    });

    useEffect(() => {
        if (window.location.pathname === "/") {
            setHideDemo(false)
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
                            <a href="/user/home">{userData.user.name}</a>
                        </>
                        :
                        <>
                            <a href="/user/login">LOGIN</a>
                            <a href="/user/signup">SIGN UP</a>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;

