import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"

import MinecraftRouter from "./minecraftRouter"

const userRouter = () => {
    return (
        <Router>
            <Route exact path="*/minecraft" component={MinecraftRouter} />
            <Route exact path="*/minecraft/*" component={MinecraftRouter} />
        </Router>
    );
}

export default userRouter;