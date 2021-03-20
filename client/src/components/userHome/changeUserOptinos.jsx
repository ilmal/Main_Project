import React, { useState } from "react"
import { useSelector } from "react-redux"

const ChangeUserOptinos = () => {
    const state = useSelector(state => state)
    const [change, setChange] = useState(false)

    const toggle = () => {
        setChange(prev => !prev)
    }

    const defaulOptions = () => {
        return (
            <div className="userHomeSegment changeNameEmail userHomeChangeDefaults">
                <div>
                    <span><p>Username: </p>{state.user.name}</span>
                </div>
                <div>
                    <span><p>Email: </p>{state.user.email}</span>
                </div>
                <div>
                    <button onClick={toggle}>Change</button>
                </div>
            </div>
        )
    }

    const changeOptions = () => {
        return (
            <form className="userHomeSegment changeNameEmail userHomeChangeDefaults">
                <div>
                    <p>Username:</p>
                    <input type="text" placeholder={state.user.name} />
                </div>
                <div>
                    <p>Email:</p>
                    <input type="text" placeholder={state.user.email} />
                </div>
                <div>
                    <button onClick={toggle}>Save</button>
                </div>
            </form>
        )
    }


    switch (change) {
        case true:
            return changeOptions()
        default:
            return defaulOptions()
    }
}

export default ChangeUserOptinos