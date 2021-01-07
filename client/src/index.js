import React from "react"
import ReactDOM from "react-dom"
import { 
    BrowserRouter as Router,
    Route
} from "react-router-dom"

import App from "./App.jsx"
import Header from "./components/header/header"
import HomeRouter from "./routing/router"

ReactDOM.render(
    <Router>
        <Header />
        <Route path="/" component={HomeRouter} />
    </Router>

    , document.querySelector("#root"))