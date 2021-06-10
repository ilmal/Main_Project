import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { store } from "../../../index"

const ChangeUserOptinos = () => {
    const state = useSelector(state => state)
    const [change, setChange] = useState(false)

    const toggle = () => {
        setChange(prev => !prev)
    }

    const save = async (e) => {
        e.preventDefault()
        console.log(e.target.newName.value)
        console.log(e.target.newEmail.value)

        let cookieValueUserID = null

        if (document.cookie && document.cookie.search("userID") > -1) {
            if (e.target.newName.value === "" && e.target.newEmail.value === "") {
                store.dispatch({
                    type: "ERR_MESSAGE",
                    payload: "Enter what you want to change!"
                })
                return
            }
            cookieValueUserID = document.cookie
                .split('; ')
                .find(row => row.startsWith('userID='))
                .split('=')[1];

            await axios.post(`${process.env.REACT_APP_BACKENDPROXY}/user/changeuser`, {
                withCredentials: true,
                name: e.target.newName.value,
                email: e.target.newEmail.value,
                userID: cookieValueUserID
            }).then(response => {
                if (response.body === "Changes successfully changed!") {
                    store.dispatch({
                        type: "MESSAGE",
                        payload: response.body
                    })
                } else {
                    store.dispatch({
                        type: "ERR_MESSAGE",
                        payload: response.body
                    })
                }
                window.location.reload();
            })
        } else {
            store.dispatch({
                type: "ERR_MESSAGE",
                payload: "login first!"
            })
        }

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
            <form onSubmit={save} className="userHomeSegment changeNameEmail userHomeChangeDefaults">
                <div>
                    <p>Username:</p>
                    <input name="newName" type="text" placeholder={state.user.name} />
                </div>
                <div>
                    <p>Email:</p>
                    <input name="newEmail" type="text" placeholder={state.user.email} />
                </div>
                <div>
                    <button>Save</button>
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