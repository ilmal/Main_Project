import React, { useState } from 'react';
import { store } from "../../index"

const Header = () => {

    const [userData, setUserData] = useState(store.getState())

    store.subscribe(() => {
        setUserData(store.getState());
    });

    return (
        <div className="headerBanner">
            <div className="headerInnerBanner">
                <div >
                    <a href="/" className="homeLink"><span>U1</span>servers</a>
                </div>
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

