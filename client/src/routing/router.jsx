import React, { Component } from 'react';

import { 
    BrowserRouter as Router, 
    Route, 
    Switch
} from "react-router-dom"

import homeRouter from "./home/homeRouter"
import userRouter from "./user/userRouter"
import notFoundPage from "./misc/notFoundPage"
import nothingPage from "./misc/nothing"

class testPage extends Component {
    state = {  }
    render() { 
        return ( 
            <h1>Hello this is a test page</h1>
         );
    }
}

class HomeRouter extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route exact path="/" component={homeRouter} />
                    <Route exact path="/user" component={userRouter}/>
                    <Route exact path="/user/*" component={userRouter}/>
                    <Route exact path="/test" component={testPage} />
                    <Route exact path="/nothing" component={nothingPage} />
                    <Route path="*" component={notFoundPage} />
                </Switch>
            </Router>
         );
    }
}
 
export default HomeRouter;