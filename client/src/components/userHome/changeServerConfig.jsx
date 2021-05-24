import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const ChangeServerConfig = () => {
    // stateful settings
    const state = useSelector(state => state)
    const [change, setChange] = useState(false)
    const [whitelist, setWhitelist] = useState([])
    const [opslist, setOpslist] = useState([])
    let i = 0;

    const toggle = () => {
        setChange((prev) => !prev)
    }

    useEffect(() => {
        if (state.env[6].value != null) {
            setWhitelist(state.env[6].value.split(","))
        }
        if (state.env[7].value != null) {
            setOpslist(state.env[7].value.split(","))
        }
    }, [state])

    //data for Difficulty and Versions
    const versions = [state.env[3].value, "latest", "1.16.4", "1.16.3", "1.16.2", "1.16", "1.15.2", "1.15.1",
        "1.15", "1.14.4", "1.14.3", "1.14.2", "1.14.1", "1.14", "1.13.2", "1.13.1", "1.13",
        "1.12.2", "1.12.1", "1.12"]

    let versionBoiler = versions.map((d) => {
        i++
        return <option value={d} key={i}>{d}</option>
    })

    const difficulties = [state.env[5].value, "hard", "normal", "easy", "peaceful"]

    const difficultiesBoiler = difficulties.map((d) => {
        i++
        return <option value={d} key={i}>{d}</option>
    })

    //data for Whitelist
    const changeWhite = async (data) => {
        if (data.key === "Enter") {
            data.preventDefault()
            try {
                if (data.target.value === "") {
                    throw "empty value"
                }
                if (whitelist.includes(data.target.value)) {
                    throw "name already given"
                }
                setWhitelist(whitelist.concat(data.target.value))
                data.target.value = ""
            } catch (result) {
                console.log(result)
            }

        }
    }

    const WhitelistList = () => {

        let i = 0;
        return whitelist.map((e) => {
            i += 1
            return <span key={i}>{e}</span>
        })
    }

    const WhitelistListChange = () => {
        let i = 0;
        return whitelist.map((e) => {
            i += 1
            return <span className="whiteArray" onClick={removeFromWhiteList} key={i}>{e}</span>
        })
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
            } catch (result) {
                console.log(result)
            }

        }
    }

    const OpslistList = () => {
        let i = 0;
        return opslist.map((e) => {
            i += 1
            return <span key={i}>{e}</span>
        })
    }

    const OpslistListChange = () => {
        let i = 0;
        return opslist.map((e) => {
            i += 1
            return <span className="opsArray" onClick={removeFromOpsList} key={i}>{e}</span>
        })
    }

    const removeFromOpsList = (e) => {
        let newOpsList = opslist.filter(item => item !== e.target.innerText)
        setOpslist(newOpsList)
    }

    const removeFromWhiteList = (e) => {
        let newwhitelist = whitelist.filter(item => item !== e.target.innerText)
        setWhitelist(newwhitelist)
    }

    const saveData = async (e) => {
        e.preventDefault()
        console.log("saving data")

        console.log("serverName: ", e.target.serverName.value)
        console.log("serverVersion: ", e.target.serverVersion.value)
        console.log("serverDifficulty: ", e.target.serverDifficulty.value)
        console.log("serverWhitelist: ", whitelist)
        console.log("serverOpsList: ", opslist)

        // reformatting whitelist and op-list
        const whitelistString = whitelist.join(",")
        const opslistString = opslist.join(",")

        // sending data to backend
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('userID='))
            .split('=')[1];

        await axios.post("/mcConf/updateData", {
            id: cookieValue,
            serverName: e.target.serverName.value,
            serverVersion: e.target.serverVersion.value,
            serverDifficulty: e.target.serverDifficulty.value,
            serverWhitelist: whitelistString,
            serverOpsList: opslistString
        }).then(response => {
            console.log("response from updateData: ", response.data.data)
        })
        window.location.reload()
    }

    const defaultFunc = () => {

        let configSize = "userHomeChangeConfig userHomeSegment"
        if (opslist.length > 4 || whitelist.length > 4) {
            configSize = "userHomeChangeConfigExtendOne userHomeSegment"
        }

        return (
            <div className={configSize}>
                <div className="userHomeChangeServerName userHomeChangeDefaults">
                    <p>Server Name: </p>
                    <span>{state.env[4].value}</span>
                </div>
                <div className="userHomeChangeVersion userHomeChangeDefaults">
                    <p>Version: </p>
                    <span>{state.env[3].value}</span>
                </div>
                <div className="userHomeChangeDifficulty userHomeChangeDefaults">
                    <p>Difficulty: </p>
                    <span>{state.env[5].value}</span>
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
        if (opslist.length > 4 || whitelist.length > 4) {
            configSize = "userHomeChangeConfigExtendOne userHomeSegment"
        }

        return (
            <form className={configSize} onSubmit={saveData}>
                <div className="userHomeChangeServerName userHomeChangeDefaults">
                    <p>Server Name: </p>
                    <input type="text" name="serverName" className="userHomeChangeServer" />
                </div>
                <div className="userHomeChangeVersion userHomeChangeDefaults">
                    <p>Server Version: </p>
                    <select name="serverVersion" id="">
                        {versionBoiler}
                    </select>
                </div>
                <div className="userHomeChangeDifficulty userHomeChangeDefaults">
                    <p>Server Difficulty: </p>
                    <select name="serverDifficulty" id="">
                        {difficultiesBoiler}
                    </select>
                </div>
                <div className="userHomeChangeWhitelist userHomeChangeDefaults">
                    <p>Whitelists:</p>
                    <WhitelistListChange />
                    <input type="text" name="serverWhitelist" onKeyPress={changeWhite} />
                </div>
                <div className="userHomeChangeOps userHomeChangeDefaults">
                    <p>Ops:</p>
                    <OpslistListChange />
                    <input type="text" name="serverOps" onKeyPress={changeOps} />
                </div>
                <div className="userHomeChangeBtn userHomeChangeDefaults">
                    <button type="submit">save</button>
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