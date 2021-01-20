import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
} from "react-router-dom"

import loginPage from "./loginRouter"
import signupPage from "./signupRouter"
import homePage from "./homeRouter"

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