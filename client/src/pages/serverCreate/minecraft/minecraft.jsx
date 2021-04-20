import { useHistory } from "react-router-dom";


const MinecraftCreate = () => {

    const history = useHistory();

    const handleClick = (e) => {
        switch (e.target.className) {
            case "minecraftCards basic":
                console.log("1")
                history.push("/server/minecraft/basic");
                window.location.reload();
                break;
            case "minecraftCards normal":
                console.log("2")
                history.push("/server/minecraft/normal");
                window.location.reload();
                break;
            case "minecraftCards premium":
                console.log("3")
                history.push("/server/minecraft/premium");
                window.location.reload();
                break;
            default:
                console.log("err, something wong")
                window.location.reload();
                break;
        }

    }

    const testServerBtn = () => {
        history.push("/server/minecraft/test");
        window.location.reload();
    }

    return (
        <div className="minecraftBody">
            <span>Choose your Minecraft Server!</span>
            <div className="testServerCard">
                <div>
                    <div className="testHeader">
                        <span>Test server</span>
                    </div>
                    <div className="container">
                        <div>
                            <span>Early access!</span>
                            <button onClick={testServerBtn}>Get the server</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="minecraftCards basic" onClick={handleClick}>
                    <div className="titleContainer basicTitleContainer">
                        <span>BASIC</span>
                    </div>
                    <div className="priceContainer">
                        <span>$?? <span className="priceMonth">/ month</span></span>
                    </div>
                    <div className="specsContainer">
                        <span className="cpuSpec">CPU</span>
                        <span className="memSpec">MEMORY</span>
                        <span className="cpuSpecValue">? cores</span>
                        <span className="memSpecValue">?gb</span>
                    </div>
                    <div className="seperationline" />
                    <div className="description">
                        <span>The basic server is the perfect option for a small group of friends, works great for 3 players</span>
                    </div>
                </div>
                <div className="minecraftCards normal" onClick={handleClick}>
                    <div className="titleContainer normalTitleContainer">
                        <span>NORMAL</span>
                    </div>
                    <div className="priceContainer">
                        <span>$?? <span className="priceMonth">/ month</span></span>
                    </div>
                    <div className="specsContainer">
                        <span className="cpuSpec">CPU</span>
                        <span className="memSpec">MEMORY</span>
                        <span className="cpuSpecValue">? cores</span>
                        <span className="memSpecValue">?gb</span>
                    </div>
                    <div className="seperationline" />
                    <div className="description">
                        <span>This is the server made for a larger group of friends, works great for 6 players</span>
                    </div>
                </div>
                <div className="minecraftCards premium" onClick={handleClick}>
                    <div className="titleContainer premiumTitleContainer">
                        <span>PREMIUM</span>
                    </div>
                    <div className="priceContainer">
                        <span>$?? <span className="priceMonth">/ month</span></span>
                    </div>
                    <div className="specsContainer">
                        <span className="cpuSpec">CPU</span>
                        <span className="memSpec">MEMORY</span>
                        <span className="cpuSpecValue">? cores</span>
                        <span className="memSpecValue">?gb</span>
                    </div>
                    <div className="seperationline" />
                    <div className="description">
                        <span>This is the server made for a large group of players, works great for 10 players</span>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default MinecraftCreate;
