import React from "react"
import ReactDOM from "react-dom"
import { 
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import "./scss/main.scss"

import Header from "./components/header/header"
import HomeRouter from "./routing/router"

ReactDOM.render(
    <Router>
        <Header />
        <div className="headerFix"> 
            <Route path="/" component={HomeRouter} />
        </div>
    </Router>

    , document.querySelector("#root"))