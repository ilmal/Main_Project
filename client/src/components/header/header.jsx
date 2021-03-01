import React, { useState } from 'react';
import { store } from "../../index"
import { fetchUserData, checkUserAuth } from "../../redux/actions/index"


const Header = ()=> {

    const [userData, setUserData] = useState(store.getState())
    const [hasAuthCheck, setHasAuthCheck] = useState(false)

    const auth = async ()=>{
        if(!hasAuthCheck){
            await store.dispatch(fetchUserData)
            await store.dispatch(checkUserAuth)
            setUserData(store.getState())
            setHasAuthCheck(true)

            console.log("5", userData)


            if(userData.auth !== undefined && !userData.auth){
                console.log("Not logged in")
            }
        }
    }

    auth()
    return ( 
        <div className="headerBanner">
            <div className="headerInnerBanner">
                <div >
                    <a href="/" className="homeLink">U1Servers</a>
                </div>
                <div>
                    <a href="/user/login">LOGIN</a>
                    <a href="/user/signup">SIGN UP</a>
                    {userData.auth ? <a href="/user/home">{userData.user.name}</a> : null}
                </div>
            </div>
        </div>            
    );
}
 
export default Header;

