import React, {useState} from "react"

const ChangeUserOptinos = ()=>{
    const [change, setChange] = useState(false)


    const changeOptions = ()=>{
        return(
            <form className="userHomeSegment changeNameEmail userHomeChangeDefaults">
                <div>
                    <p>Username:</p>
                    <input type="text"/>
                </div>
                <div>
                    <p>Email:</p>
                    <input type="text"/>
                </div>
                <div>
                    <button onClick ={toggle}>Save</button>
                </div>
            </form>
        )
    }

    const toggle = ()=>{
        setChange(prev => !prev)
        console.log(change)
    }

    const defaulOptions = ()=>{
        return(
            <div className="userHomeSegment changeNameEmail userHomeChangeDefaults">
                <div>
                    <span><p>Username: </p>Nils</span>
                </div>
                <div>
                    <span><p>Email: </p>Nils@u1.se</span>
                </div>
                <div>
                    <button onClick ={toggle}>Change</button>
                </div>
            </div>
        )
    }


    switch(change){
        case true:
            return changeOptions()
        default:
            return defaulOptions()
    }
}

export default ChangeUserOptinos