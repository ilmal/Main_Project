import React, { useState } from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import "./scss/main.scss"
import { applyMiddleware, createStore } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import Header from "./components/header/header"
import Boubbles from "./components/bubbleLinks"
import HomeRouter from "./routing/router"
import { Tooltips } from "./components/tooltips"
import { TopMessage } from "./components/topMessages/index"

import rootReducer from "./redux/reducers"

import { fetchUserData, checkUserAuth, createMcConfig, serverPodsInfo, serverSVCInfo, serverInfo, getQuaryParams, getCookies } from "./redux/actions/index"

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const MainComponent = () => {
    const [loading, setLoading] = useState(true)

    console.log(".env: ", process.env.REACT_APP_BACKENDPROXY)

    React.useEffect(() => {
        (async function () {
            await store.dispatch(checkUserAuth)
            await store.dispatch(getQuaryParams)
            await store.dispatch(getCookies)
            if (store.getState().cookies.userID !== "") {
                await store.dispatch(fetchUserData)
                await store.dispatch(createMcConfig)
                await store.dispatch(serverPodsInfo)
                await store.dispatch(serverSVCInfo)
                await store.dispatch(serverInfo)
            }
            console.log("data after fetch func: ", store.getState())

            // check if loginReset is true, if case, resetting cookies
            if (store.getState().resetLogin) {
                const cookieKey = ["loginAuth", "userID"]
                cookieKey.forEach(element => {
                    document.cookie = `${element}=;path=/;expires=Thu, 01 Jan 1970T00:00:00Z;`
                })
                store.dispatch({
                    type: "AUTH_SUCCESS",
                    payload: {
                        auth: store.getState().auth,
                        resetLogin: false
                    }
                })
            }

            setLoading(false)
        })();
    })

    if (loading) {
        return (
            <h1 className="loadingText">Loading...</h1>
        )
    } else {
        return (
            <Provider store={store}>
                <Router>
                    <TopMessage />
                    <Header />
                    <Route path="/" component={HomeRouter} />
                    <Boubbles />
                    <Tooltips />
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
    <MainComponent />
    , document.querySelector("#root")
)

/*
1"@testing-library/jest-dom": "^5.11.9",
2"@testing-library/react": "^11.2.5",
3"@testing-library/user-event": "^12.7.1",
4"axios": "^0.21.1",
5"js-cookie": "^2.2.1",
6"node-sass": "^4.14.1",
7"react": "^17.0.1",
8"react-cookie": "^4.0.3",
9"react-dom": "^17.0.1",
10"react-redux": "^7.2.2",
11"react-router-dom": "^5.2.0",
13"redux": "^4.0.5",
14"redux-devtools-extension": "^2.13.8",
15"redux-thunk": "^2.3.0",
16"web-vitals": "^0.2.4"
*/