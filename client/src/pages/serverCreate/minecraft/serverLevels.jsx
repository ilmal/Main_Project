import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"

export const MinecraftTest = (props) => {
    const history = useHistory();

    const state = useSelector(state => state)
    const [levelValues, setlevelValues] = useState({})

    switch (props.level) {
        case "test":
            setlevelValues({
                "cpu": "1",
                "mem": "2",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
            break;
        case "basic":
            setlevelValues({
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
            break;
        case "normal":
            setlevelValues({
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
            break;
        case "premium":
            setlevelValues({
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
            break;

        default:
            setlevelValues({
                "cpu": "ERR",
                "mem": "ERR",
                "storage": "Unlimited",
                "players": "10",
                "plugins": "Unavailable",
                "mods": "Unavailable"
            })
            break;
    }

    const toServer = () => {
        console.log(state.auth)
        if (!state.auth) {
            history.push("/user/login");
            window.location.reload();
        } else {
            history.push("/user/home");
            window.location.reload();
        }
    }

    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="innerHeader specHeader">
                    <span>Specs</span>
                </div>
                <div className="specsKeyValue">
                    <div className="specSeperator" />
                    <div className="specValue cpu">
                        <span>CPU<span className="value"> 1 CORE </span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value"> 2 GB </span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">Unlimited storage</span></span>
                    </div>
                </div>
                <div className="innerHeader gameHeader">
                    <span>Game Features</span>
                </div>
                <div className="gameKeyValue">
                    <div className="gameSeperator" />
                    <div className="gameValue">
                        <span>Max players<span className="value">10</span></span>
                    </div>
                    <div className="gameValue plugins">
                        <span>Plugins<span className="value">Unavailable</span></span>
                    </div>
                    <div className="gameValue mods">
                        <span>Mods<span className="value">Unavailable</span></span>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
                <div className="freeBody">
                    <button onClick={toServer}>Get FREE server</button>
                </div>
            </div>
        </div>
    )
};

export const MinecraftBasic = () => {
    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="innerHeader specHeader">
                    <span>Specs</span>
                </div>
                <div className="specsKeyValue">
                    <div className="specSeperator" />
                    <div className="specValue cpu">
                        <span>CPU<span className="value">1 core</span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value">2 GB</span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">Unlimited</span></span>
                    </div>
                </div>
                <div className="innerHeader gameHeader">
                    <span>Game Features</span>
                </div>
                <div className="gameKeyValue">
                    <div className="gameSeperator" />
                    <div className="gameValue">
                        <span>Max players<span className="value">10</span></span>
                    </div>
                    <div className="gameValue plugins">
                        <span>Plugins<span className="value">Unavailable</span></span>
                    </div>
                    <div className="gameValue mods">
                        <span>Mods<span className="value">Unavailable</span></span>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
            </div>
        </div>
    )
};

export const MinecraftNormal = () => {
    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="innerHeader specHeader">
                    <span>Specs</span>
                </div>
                <div className="specsKeyValue">
                    <div className="specSeperator" />
                    <div className="specValue cpu">
                        <span>CPU<span className="value">1 core - Cortex-A72 - 1.5GHz</span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value">2gb - LPDDR4</span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">Dynamic - HDD</span></span>
                    </div>
                </div>
                <div className="innerHeader gameHeader">
                    <span>Game Features</span>
                </div>
                <div className="gameKeyValue">
                    <div className="gameSeperator" />
                    <div className="gameValue">
                        <span>Max players<span className="value">Unlimited</span></span>
                    </div>
                    <div className="gameValue plugins">
                        <span>Plugins<span className="value">Available</span></span>
                    </div>
                    <div className="gameValue mods">
                        <span>Mods<span className="value">Available</span></span>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
            </div>
        </div>
    )
};

export const MinecraftPremuim = () => {
    return (
        <div className="minecraftBasicBody">
            <div className="overviewBody">
                <div className="header">
                    <span>Overview</span>
                </div>
                <div className="innerHeader specHeader">
                    <span>Specs</span>
                </div>
                <div className="specsKeyValue">
                    <div className="specSeperator" />
                    <div className="specValue cpu">
                        <span>CPU<span className="value">1 core - Cortex-A72 - 1.5GHz</span></span>
                    </div>
                    <div className="specValue mem">
                        <span>Memory<span className="value">2gb - LPDDR4</span></span>
                    </div>
                    <div className="specValue storage">
                        <span>Storage<span className="value">Dynamic - HDD</span></span>
                    </div>
                </div>
                <div className="innerHeader gameHeader">
                    <span>Game Features</span>
                </div>
                <div className="gameKeyValue">
                    <div className="gameSeperator" />
                    <div className="gameValue">
                        <span>Max players<span className="value">Unlimited</span></span>
                    </div>
                    <div className="gameValue plugins">
                        <span>Plugins<span className="value">Available</span></span>
                    </div>
                    <div className="gameValue mods">
                        <span>Mods<span className="value">Available</span></span>
                    </div>
                </div>
            </div>
            <div className="paymentBody">
                <div className="header">
                    <span>Payment</span>
                </div>
            </div>
        </div>
    )
};