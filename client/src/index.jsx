import React from "react"
import ReactDOM from "react-dom"
import { 
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import "./scss/main.scss"
import { createStore } from "redux"
import { Provider } from "react-redux"

import Header from "./components/header/header"
import HomeRouter from "./routing/router"

import rootReducer from "./redux/reducers"

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Header/>
                <Route path="/" component={HomeRouter} />
        </Router>
    </Provider>
    , document.querySelector("#root"))