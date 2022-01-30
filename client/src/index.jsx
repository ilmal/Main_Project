import React, { useState } from "react"
import ReactDOM from "react-dom"
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import "./scss/main.scss"
import { Provider } from "react-redux"
import store from "./store"

import Header from "./components/header/header"
import Boubbles from "./components/bubbleLinks"
import HomeRouter from "./routing/router"
import { Tooltips } from "./components/tooltips"
import { TopMessage } from "./components/topMessages/index"

import loadBaseData from "./components/loadBaseData"


const MainComponent = () => {
    const [loading, setLoading] = useState(true)

    React.useEffect(async () => {
        if (!loading) return
        await loadBaseData()
        console.log("im a sneaky boi!")
        setLoading(false)
    }, [loading])

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