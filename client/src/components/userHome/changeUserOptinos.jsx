import React, {useState} from "react"

const ChangeUserOptinos = ()=>{
    const [change, setChange] = useState(false)


    const changeOptions = ()=>{
        return(
            <form className="userHomeSegment changeNameEmail">
                <div>
                    <h3>Username:</h3>
                    <input type="text"/>
                </div>
                <div>
                    <h3>Email:</h3>
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
            <div className="userHomeSegment changeNameEmail">
                <div>
                    <span><h3>Username: </h3>Nils</span>
                </div>
                <div>
                    <span><h3>Email: </h3>Nils@u1.se</span>
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