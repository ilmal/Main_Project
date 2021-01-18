import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
} from "react-router-dom"

import loginPage from "./loginPage"
import signupPage from "./signupPage"
import homePage from "./homePage"

class userRouter extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Route exact path="*/login" component={loginPage} />
                <Route exact path="*/signup" component={signupPage} />
                <Route exact path="*/home" component={homePage} />
            </Router>
         );
    }
}
 
export default userRouter;