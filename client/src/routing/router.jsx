import React, { Component } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom"

import homeRouter from "./home/homeRouter"
import userRouter from "./user/userRouter"
import serverRouter from "./server/serverRouter"
import notFoundPage from "./misc/notFoundPage"

class HomeRouter extends Component {
    render() {
        return (
            <Router forceRefresh={true}>
                <Switch>
                    <Route exact path="/" component={homeRouter} />
                    <Route exact path="/user" component={userRouter} />
                    <Route exact path="/user/*" component={userRouter} />
                    <Route exact path="/server" component={serverRouter} />
                    <Route exact path="/server/*" component={serverRouter} />
                    <Route path="*" component={notFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default HomeRouter;