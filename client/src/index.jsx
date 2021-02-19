import React from "react"
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
import HomeRouter from "./routing/router"

import rootReducer from "./redux/reducers"

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Header/>
                <Route path="/" component={HomeRouter} />
        </Router>
    </Provider>
    , document.querySelector("#root"))