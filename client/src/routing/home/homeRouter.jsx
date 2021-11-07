import React from "react"

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import HomePage from "../../pages/home"

const HomeRouter = () => {


    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default HomeRouter;