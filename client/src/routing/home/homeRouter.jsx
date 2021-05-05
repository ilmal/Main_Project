import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { getEmailAction } from "../../redux/actions"

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