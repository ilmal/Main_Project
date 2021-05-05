import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"

import { MessagePage, MessageError, MessageTodo } from "../../pages/message"

const MessageRouter = () => {

    return (
        <Router>
            <Route exact path="*/home" component={MessagePage} />
            <Route exact path="*/error" component={MessageError} />
            <Route exact path="*/todo" component={MessageTodo} />
        </Router>
    )
}

export default MessageRouter