import React, {useState} from "react"

const ChangeUserPass = ()=>{
    const [change, setChange] = useState(false)

    const toggle = ()=>{
        setChange(prev => !prev)
    }

    const passChange = ()=>{
        return(
            <div className="userHomeSegment changePassword userHomeChangeDefaults">
                <button onClick={ toggle }>save</button>
            </div>
        )

    }

    const passDefault = ()=>{
        return(
            <div className="userHomeSegment changePassword userHomeChangeDefaults">
                <button onClick={ toggle }>Change Password</button>
            </div>
        )

    }

    switch(change){
        case true:
            return passChange()
        default:
            return passDefault()
    }
}

export default ChangeUserPass