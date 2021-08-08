import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"

import MinecraftCreate from "../../pages/serverCreate/minecraft/minecraft"

const userRouter = () => {
    return (
        <Router>
            <Route exact path="*/minecraft" component={MinecraftCreate} />
        </Router>
    );
}

export default userRouter;