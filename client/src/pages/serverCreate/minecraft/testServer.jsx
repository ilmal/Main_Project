import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux"

const MinecraftBasic = () => {
    const history = useHistory();

    const state = useSelector(state => state)

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

export default MinecraftBasic;
