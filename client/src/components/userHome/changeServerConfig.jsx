import React, { useState } from "react"
import { store } from "../../index";

const ChangeServerConfig = () => {
    // stateful settings
    const [userData, updateUserData] = useState(store.getState());
    const [change, setChange] = useState(false)
    const [whitelist, setWhitelist] = useState(userData.env.env[6].value.split(","))
    const [opslist, setOpslist] = useState(userData.env.env[7].value.split(","))
    let i = 0;


    const toggle = () => {
        setChange((prev) => !prev)
    }

    //data for Difficulty and Versions
    const versions = [userData.env.env[3].value, "latest", "1.16.4", "1.16.3", "1.16.2", "1.16", "1.15.2", "1.15.1",
        "1.15", "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14", "1.13.2", "1.13.1", "1.13",
        "1.12.2", "1.12.1", "1.12"]

    let versionBoiler = versions.map((d) => {
        i++
        return <option value={d} key={i}>{d}</option>
    })

    const difficulties = [userData.env.env[5].value, "hard", "normal", "easy", "peaceful"]

    const difficultiesBoiler = difficulties.map((d) => {
        i++
        return <option value={d} key={i}>{d}</option>
    })

    //data for Whitelist
    const changeWhite = data => {
        if (data.key === "Enter") {
            data.preventDefault()
            try {
                if (data.target.value === "") {
                    throw "empty value"
                }
                if (whitelist.includes(data.target.value)) {
                    throw "name already given"
                }
                setWhitelist(userData.env.env[6].value.split(","))
                setWhitelist(whitelist.concat(data.target.value))
                data.target.value = ""
                console.log("whitelistTest: ", whitelist)
            } catch (result) {
                console.log(result)
            }

        }
    }

    const WhitelistList = () => {
        if (userData.env.env[6].value === null) {
            return null
        } else {
            let whiteArray = whitelist
            let i = 0;
            return whiteArray.map((e) => {
                i += 1
                return <span key={i}>{e}</span>
            })
        }
    }

    const WhitelistListChange = () => {
        if (userData.env.env[6].value === null) {
            return null
        } else {
            let whiteArray = userData.env.env[6].value.split(",")
            let i = 0;
            return whiteArray.map((e) => {
                i += 1
                return <span className="whiteArray" key={i}>{e}</span>
            })
        }
    }

    //data for Ops
    const changeOps = data => {
        if (data.key === "Enter") {
            data.preventDefault()
            try {
                if (data.target.value === "") {
                    throw "empty value"
                }
                if (opslist.includes(data.target.value)) {
                    throw "name already given"
                }
                setOpslist(opslist.concat(data.target.value))
                data.target.value = ""
                console.log(opslist)
                console.log(opslist.length)
            } catch (result) {
                console.log(result)
            }

        }
    }

    const OpslistList = () => {
        if (userData.env.env[7].value === null) {
            return null
        } else {
            let whiteArray = userData.env.env[6].value.split(",")
            let i = 0;
            return whiteArray.map((e) => {
                i += 1
                return <span className="whiteArray" key={i}>{e}</span>
            })
        }
    }

    const OpslistListChange = () => {
        if (userData.env.env[7].value === null) {
            return null
        } else {
            let whiteArray = userData.env.env[6].value.split(",")
            let i = 0;
            return whiteArray.map((e) => {
                i += 1
                return <span className="opsArray" key={i}>{e}</span>
            })
        }
    }

    const defaultFunc = () => {
        return (
            <div className="userHomeSegment userHomeChangeConfig">
                <div className="userHomeChangeServerName userHomeChangeDefaults">
                    <p>Server Name: </p>
                    <span>{userData.env.env[4].value}</span>
                </div>
                <div className="userHomeChangeVersion userHomeChangeDefaults">
                    <p>Version: </p>
                    <span>{userData.env.env[3].value}</span>
                </div>
                <div className="userHomeChangeDifficulty userHomeChangeDefaults">
                    <p>Difficulty: </p>
                    <span>{userData.env.env[5].value}</span>
                </div>
                <div className="userHomeChangeWhitelist userHomeChangeDefaults">
                    <p>whitelist: </p>
                    <span><WhitelistList /></span>
                </div>
                <div className="userHomeChangeOps userHomeChangeDefaults">
                    <p>ops: </p>
                    <span><OpslistList /></span>
                </div>
                <div className="userHomeChangeBtn userHomeChangeDefaults">
                    <button onClick={toggle}>change</button>
                </div>
            </div>
        );

    }

    const changeFunc = () => {

        let configSize = "userHomeChangeConfig userHomeSegment"
        if (opslist.length > 4) {
            configSize = "userHomeChangeConfigExtendOne userHomeSegment"
        }

        return (
            <form className={configSize} onSubmit={e => { e.preventDefault(); }}>
                <div className="userHomeChangeServerName userHomeChangeDefaults">
                    <p>Server Name: </p>
                    <input type="text" className="userHomeChangeServer" />
                </div>
                <div className="userHomeChangeVersion userHomeChangeDefaults">
                    <p>Server Version: </p>
                    <select name="" id="">
                        {versionBoiler}
                    </select>
                </div>
                <div className="userHomeChangeDifficulty userHomeChangeDefaults">
                    <p>Server Difficulty: </p>
                    <select name="" id="">
                        {difficultiesBoiler}
                    </select>
                </div>
                <div className="userHomeChangeWhitelist userHomeChangeDefaults">
                    <p>Whitelists:</p>
                    <WhitelistListChange />
                    <input type="text" onKeyPress={changeWhite} />
                </div>
                <div className="userHomeChangeOps userHomeChangeDefaults">
                    <p>Ops:</p>
                    <OpslistListChange />
                    <input type="text" onKeyPress={changeOps} />
                </div>
                <div className="userHomeChangeBtn userHomeChangeDefaults">
                    <button onClick={toggle}>save</button>
                </div>
            </form>
        );
    }

    switch (change) {
        case true:
            return changeFunc()
        default:
            return defaultFunc()
    }
}

export default ChangeServerConfig



// import React, {
//     Component
// } from "react"


// class ChangeServerConfig extends Component {
//     state = {
//         change: false,
//         whitelist: ["nils", "miniPancookies"],
//         opslist: ["nils", "miniPancookies"]
//     }

//     toggle = () => {
//         this.setState({ change: !this.state.change })
//         console.log(this.state.change)
//     }

//     //data for Difficulty and Versions
//     versions = ["LATEST", "1.16.4", "1.16.3", "1.16.2", "1.16", "1.15.2", "1.15.1",
//         "1.15", "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14", "1.13.2", "1.13.1", "1.13",
//         "1.12.2", "1.12.1", "1.12"]

//     versionBoiler = this.versions.map((d) => {
//         return <option value={d} key={d}>{d}</option>
//     })

//     difficulties = ["peaceful", "easy", "normal", "hard"]

//     difficultiesBoiler = this.difficulties.map((d) => {
//         return <option value={d} key={d}>{d}</option>
//     })

//     //data for Whitelist
//     changeWhite = data => {
//         if (data.key === "Enter") {
//             data.preventDefault()
//             try {
//                 if (data.target.value === "") {
//                     throw "empty value"
//                 }
//                 if (this.state.whitelist.includes(data.target.value)) {
//                     throw "name already given"
//                 }
//                 this.setState({ whitelist: this.state.whitelist.concat(data.target.value) })
//                 data.target.value = ""
//                 console.log(this.state.whitelist)
//             } catch (result) {
//                 console.log(result)
//             }

//         }
//     }

//     WhitelistList = () => {
//         return this.state.whitelist.map((e) => {
//             return <span key={e}>{e}</span>
//         })
//     }

//     //data for Ops
//     changeOps = data => {
//         if (data.key === "Enter") {
//             data.preventDefault()
//             try {
//                 if (data.target.value === "") {
//                     throw "empty value"
//                 }
//                 if (this.state.opslist.includes(data.target.value)) {
//                     throw "name already given"
//                 }
//                 this.setState({ opslist: this.state.opslist.concat(data.target.value) })
//                 data.target.value = ""
//                 console.log(this.state.opslist)
//                 console.log(this.state.opslist.length)
//             } catch (result) {
//                 console.log(result)
//             }

//         }
//     }

//     OpslistList = () => {
//         return this.state.opslist.map((e) => {
//             return <span key={e}>{e}</span>
//         })
//     }

//     defaultFunc = () => {
//         return (
//             <div className="userHomeSegment userHomeChangeConfig">
//                 <div className="userHomeChangeServerName userHomeChangeDefaults">
//                     <p>Server Name: </p>
//                     <span>NilsServer</span>
//                 </div>
//                 <div className="userHomeChangeVersion userHomeChangeDefaults">
//                     <p>Version: </p>
//                     <span>1.16.4</span>
//                 </div>
//                 <div className="userHomeChangeDifficulty userHomeChangeDefaults">
//                     <p>Difficulty: </p>
//                     <span>Hard</span>
//                 </div>
//                 <div className="userHomeChangeWhitelist userHomeChangeDefaults">
//                     <p>whitelist: </p>
//                     <span><this.WhitelistList /></span>
//                 </div>
//                 <div className="userHomeChangeOps userHomeChangeDefaults">
//                     <p>ops: </p>
//                     <span><this.WhitelistList /></span>
//                 </div>
//                 <div className="userHomeChangeBtn userHomeChangeDefaults">
//                     <button onClick={this.toggle}>change</button>
//                 </div>
//             </div>
//         );

//     }


//     changeFunc = () => {

//         let configSize = "userHomeChangeConfig"
//         let layout = ""
//         if (this.state.opslist.length > 4 || this.state.whitelist.length > 4) {
//             configSize = "userHomeChangeConfigExtendOne"
//         }
//         if (this.state.opslist.length > 12 || this.state.whitelist.length > 7) {
//             configSize = "userHomeChangeConfigExtendTwo"
//         }

//         return (
//             <form className={configSize + " userHomeSegment"} onSubmit={e => { e.preventDefault(); }}>
//                 <div className="userHomeChangeServerName userHomeChangeDefaults">
//                     <p>Server Name: </p>
//                     <input type="text" className="userHomeChangeServer" />
//                 </div>
//                 <div className="userHomeChangeVersion userHomeChangeDefaults">
//                     <p>Server Version: </p>
//                     <select name="" id="">
//                         {this.versionBoiler}
//                     </select>
//                 </div>
//                 <div className="userHomeChangeDifficulty userHomeChangeDefaults">
//                     <p>Server Difficulty: </p>
//                     <select name="" id="">
//                         {this.difficultiesBoiler}
//                     </select>
//                 </div>
//                 <div className="userHomeChangeOps userHomeChangeDefaults">
//                     <p>Ops:</p>
//                     <this.OpslistList />
//                     <input type="text" onKeyPress={this.changeOps} />
//                 </div>
//                 <div className="userHomeChangeWhitelist userHomeChangeDefaults">
//                     <p>Whitelists:</p>
//                     <this.WhitelistList />
//                     <input type="text" onKeyPress={this.changeWhite} />
//                 </div>
//                 <div className="userHomeChangeBtn userHomeChangeDefaults">
//                     <button onClick={this.toggle}>save</button>
//                 </div>
//             </form>
//         );
//     }

//     render() {
//         switch (this.state.change) {
//             case true:
//                 return this.changeFunc()
//             default:
//                 return this.defaultFunc()
//         }
//     }
// }

// export default ChangeServerConfig;