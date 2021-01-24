import React, {
    useState
} from "react"

const ChangeServerConfig = ()=>{

    // stateful settings
    const [change, setChange] = useState(false)
    const [whitelist, setWhitelist] = useState(["nils", "miniPancookies"])
    const [opslist, setOpslist] = useState(["nils", "miniPancookies"])

    const toggle =()=>{
        setChange((prev)=>!prev)
    }

    //data for Difficulty and Versions
    const versions = ["LATEST", "1.16.4", "1.16.3", "1.16.2", "1.16", "1.15.2", "1.15.1",
        "1.15","1.14.4", "1.14.3", "1.14.2", "1.14.1","1.14","1.13.2","1.13.1", "1.13", 
        "1.12.2", "1.12.1", "1.12"]

    let versionBoiler = versions.map((d)=>{
        return <option value={ d } key={ d }>{ d }</option>
    })

    const difficulties = ["peaceful", "easy", "normal", "hard"]

    const difficultiesBoiler = difficulties.map((d)=>{
        return <option value={ d } key={ d }>{ d }</option>
    })

    //data for Whitelist
    const changeWhite = data =>{
        if(data.key === "Enter"){
            data.preventDefault()
            try {
                if(data.target.value === ""){
                    throw "empty value"
                }
                if(whitelist.includes(data.target.value)){
                    throw "name already given"
                }
                setWhitelist(whitelist.concat(data.target.value))
                data.target.value = ""
                console.log(whitelist)
            } catch (result) {
                console.log(result)
            }

        }
    }   

    const WhitelistList = ()=>{
        return whitelist.map((e)=>{
            return <span key={e}>{e}</span>
        })
    }

    //data for Ops
    const changeOps = data =>{
        if(data.key === "Enter"){
            data.preventDefault()
            try {
                if(data.target.value === ""){
                    throw "empty value"
                }
                if(opslist.includes(data.target.value)){
                    throw "name already given"
                }
                setOpslist(opslist.concat(data.target.value))
                data.target.value = ""
                console.log(opslist)
            } catch (result) {
                console.log(result)
            }

        }
    }   

    const OpslistList = ()=>{
        return opslist.map((e)=>{
            return <span key={e}>{e}</span>
        })
    }

    const defaultFunc = ()=>{   
        return(
            <div className="userHomeSegment userHomeChangeConfig">
                    <div className="userHomeChangeServerName userHomeChangeDefaults">
                        <p>Server Name: </p>
                        <span>NilsServer</span>
                    </div>
                    <div className="userHomeChangeVersion userHomeChangeDefaults">
                        <p>Version: </p>
                        <span>1.16.4</span>
                    </div>
                    <div className="userHomeChangeDifficulty userHomeChangeDefaults">
                        <p>Difficulty: </p>
                        <span>Hard</span>
                    </div>
                    <div className="userHomeChangeWhitelist userHomeChangeDefaults">
                        <p>whitelist: </p>
                        <span><WhitelistList/></span>
                    </div>
                    <div className="userHomeChangeOps userHomeChangeDefaults">
                        <p>ops: </p>
                        <span><WhitelistList/></span>
                    </div>
                    <div className="userHomeChangeBtn userHomeChangeDefaults">
                        <button onClick={ toggle }>change</button>
                    </div>
            </div>
        );

    }

    const changeFunc = ()=>{
        return(
            <form className="userHomeSegment userHomeChangeConfig" onSubmit={e => { e.preventDefault(); }}>
                <div className="userHomeChangeServerName userHomeChangeDefaults">
                    <p>Server Name: </p>
                    <input type="text" className="userHomeChangeServer"/>
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
                    <WhitelistList/>
                    <input type="text" onKeyPress={ changeWhite }/>
                </div>
                <div className="userHomeChangeOps userHomeChangeDefaults">
                    <p>Ops:</p>
                    <OpslistList/>
                    <input type="text" onKeyPress={ changeOps }/>
                </div>
                <div className="userHomeChangeBtn userHomeChangeDefaults">
                        <button onClick={ toggle }>save</button>
                    </div>
            </form>
        );
    }

    switch(change){
        case true: 
            return changeFunc()
        default:
            return defaultFunc()
    }
}

export default ChangeServerConfig