const MinecraftBasic = () => {
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

export default MinecraftBasic;
