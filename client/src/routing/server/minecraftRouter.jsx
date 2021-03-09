import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"

import MinecraftCreate from "../../pages/serverCreate/minecraft/minecraft"
import MinecraftBasic from "../../pages/serverCreate/minecraft/basic"

const MinecraftRouter = () => {

    const test = () => {
        return (
            <h1>this is the test page</h1>
        )
    }

    return (
        <Router>
            <Route exact path="*/basic" component={MinecraftBasic} />
            <Route exact path="*/home" component={MinecraftCreate} />
        </Router>
    )
}

export default MinecraftRouter