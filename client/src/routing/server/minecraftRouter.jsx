import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom"

import MinecraftCreate from "../../pages/serverCreate/minecraft/minecraft"
import MinecraftTest from "../../pages/serverCreate/minecraft/testServer"
import MinecraftBasic from "../../pages/serverCreate/minecraft/basic"
import MinecraftNormal from "../../pages/serverCreate/minecraft/normal"
import MinecraftPremium from "../../pages/serverCreate/minecraft/premium"

const MinecraftRouter = () => {

    const test = () => {
        return (
            <h1>this is the test page</h1>
        )
    }

    return (
        <Router>
            <Route exact path="*/test" component={MinecraftTest} />
            <Route exact path="*/basic" component={MinecraftBasic} />
            <Route exact path="*/normal" component={MinecraftNormal} />
            <Route exact path="*/premium" component={MinecraftPremium} />
            <Route exact path="*/home" component={MinecraftCreate} />
        </Router>
    )
}

export default MinecraftRouter